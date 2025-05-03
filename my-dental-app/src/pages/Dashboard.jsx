import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Container,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Collapse,
  IconButton,
  Chip,
  Grid,
  Divider,
  Popover,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PhoneIcon from "@mui/icons-material/Phone";
import NotesIcon from "@mui/icons-material/Notes";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import DateRangeIcon from "@mui/icons-material/DateRange";


// Constants
const SESSION_TIMES = {
  MORNING: {
    start: 10,
    end: 14,
    label: "MORNING (10AM-2PM)",
    icon: WbSunnyIcon,
  },
  EVENING: {
    start: 17,
    end: 21,
    label: "EVENING (5PM-9PM)",
    icon: NightsStayIcon,
  },
};

const TREATMENT_TYPES = [
  "Regular Checkup",
  "Dental Cleaning",
  "Tooth Extraction",
  "Root Canal",
  "Consultation",
  "Follow-up",
];

// Reusable Styles
const styles = {
  tableHead: {
    backgroundColor: "#101828",
  },
  tableHeadCell: {
    fontWeight: "bold",
    color: "white",
  },
  tableSortLabel: {
    "&.MuiTableSortLabel-root": { color: "white" },
    "&.MuiTableSortLabel-root.Mui-active": { color: "white" },
    "& .MuiTableSortLabel-icon": { color: "white !important" },
  },
  statsIcon: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    mr: 2,
  },
  infoSection: {
    display: "flex",
    alignItems: "center",
    mb: 1,
  },
  sectionIcon: {
    mr: 1,
  },
  sectionTitle: {
    fontWeight: "medium",
    color: "#2e7d32",
  },
  sectionContent: {
    pl: 6,
    mb: 2,
  },
  actionButton: (color) => ({
    borderColor: color,
    color: color,
    "&:hover": {
      borderColor: color,
      backgroundColor: `${color}14`, // 8% opacity
    },
    minWidth: "60px",
    py: 0.5,
    fontSize: "0.75rem",
  }),
  notesBox: {
    pl: 4,
    p: 2,
    bgcolor: "#e8f5e9",
    borderRadius: 1,
    border: "1px dashed #81c784",
  },
  // Date picker styles
  datePickerPopover: {
    p: 2,
    width: 300,
  },
  dateRangeDisplay: {
    display: "flex",
    justifyContent: "space-between",
    mb: 2,
  },
};

// Helper function to generate time slots
const generateTimeSlots = (session) => {
  const slots = [];
  const { start, end } = SESSION_TIMES[session];

  for (let hour = start; hour < end; hour++) {
    const hour24 = hour.toString().padStart(2, "0");
    const hourDisplay = hour > 12 ? `${hour - 12}` : `${hour}`;
    const period = hour >= 12 ? "PM" : "AM";

    slots.push({
      value: `${hour24}:00`,
      display: `${hourDisplay}:00 ${period}`,
    });
    slots.push({
      value: `${hour24}:30`,
      display: `${hourDisplay}:30 ${period}`,
    });
  }

  return slots;
};

// Row component for collapsible functionality
const AppointmentRow = ({
  appointment,
  handleOpenSlotClick,
  handleEditAppointment, // Make sure this is in the destructured props
  formatTime,
  calculateEndTime,
}) => {
    const [open, setOpen] = useState(false);
    const endTime = calculateEndTime(appointment.slotTime);
    const timeRange = `${formatTime(appointment.slotTime)} - ${formatTime(
      endTime
    )}`;
  
    // Mock data for demonstration purposes
    const comments =
      appointment.comments ||
      (appointment.isOpen
        ? "This slot is available for booking"
        : "Patient requested appointment via phone. Previous visit was 6 months ago for regular checkup. No known allergies.");
  
    const insuranceInfo =
      appointment.insuranceInfo ||
      (appointment.isOpen
        ? ""
        : "Insurance: MetLife Dental, ID: ML-" +
          Math.floor(100000 + Math.random() * 900000));
  
    const lastVisit =
      appointment.lastVisit || (appointment.isOpen ? "" : "October 15, 2024");
  
    const allergies =
      appointment.allergies ||
      (appointment.isOpen ? "" : Math.random() > 0.7 ? "Penicillin" : "None");
  
    return (
      <>
        <TableRow
          sx={{
            height: "44px", // Reduced from 48px
            "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
            "&:hover": {
              backgroundColor: appointment.isOpen ? "#e8f5e9" : "#f0f0f0",
              cursor: appointment.isOpen ? "pointer" : "default",
            },
          }}
        >
          <TableCell padding="none" width="30px"> {/* Removed default padding */}
            {!appointment.isOpen && (
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
                sx={{ p: 0.5 }} // Reduced padding
              >
                {open ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
              </IconButton>
            )}
          </TableCell>
          <TableCell sx={{ py: 0.5, px: 1, pl:4 }}> {/* Reduced padding */}
            <Box
              sx={{
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: appointment.isOpen ? "#198fe6" : "red",
                color: "white",
                py: 0.2, // Reduced padding
                px: 0.8, // Reduced padding
                borderRadius: 1,
                fontSize: "0.65rem", // Smaller text
                fontWeight: "bold",
                width: "70px", // Smaller width
                minWidth: "70px",
                whiteSpace: "nowrap",
                textAlign: "center",
                lineHeight: "1.1", // Tighter line height
              }}
              onClick={() =>
                appointment.isOpen && handleOpenSlotClick(appointment)
              }
            >
              {appointment.isOpen ? "OPEN SLOT" : "BOOKED"}
            </Box>
          </TableCell>
          <TableCell sx={{ py: 0.5, px: 1, pl:3 }}> {/* Reduced padding */}
            {appointment.isOpen ? "—" : appointment.patientName}
          </TableCell>
          <TableCell sx={{ py: 0.5, px: 1, pl:4 }}>
            {appointment.isOpen ? "—" : appointment.treatmentType}
          </TableCell>
          <TableCell sx={{ py: 0.5, px: 1, pl:3.5 }}>
            {appointment.isOpen ? "—" : appointment.phoneNumber}
          </TableCell>
          <TableCell sx={{ py: 0.5, px: 1 }}>{timeRange}</TableCell>
          <TableCell sx={{ py: 0.5, px: 1 }}>{appointment.date}</TableCell>
          <TableCell sx={{ py: 0.5, px: 1 }}>
            {!appointment.isOpen && (
              <Box sx={{ display: "flex", gap: 0.5 }}>
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    height: '22px',
                    minWidth: '54px',
                    px: 1,
                    backgroundColor: "#4caf50",
                    color: "#fff",
                    '&:hover': {
                      backgroundColor: "#43a047",
                    },
                    '&:active': {
                      backgroundColor: "#388e3c",
                    },
                    '&:focus': {
                      outline: '2px solid #4caf50',
                      outlineOffset: '2px',
                    }
                  }}
                  onClick={() => handleEditAppointment(appointment)}
                >
                  Edit
                </Button>

                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    height: '22px',
                    minWidth: '54px',
                    px: 1,
                    backgroundColor: "#f44336",
                    color: "#fff",
                    '&:hover': {
                      backgroundColor: "#e53935", // hover red
                    },
                    '&:active': {
                      backgroundColor: "#d32f2f", // pressed red
                    },
                    '&:focus': {
                      outline: '2px solid #f44336',
                      outlineOffset: '2px',
                    }
                  }}
                >
                  Delete
                </Button>
              </Box>
            )}
          </TableCell>
        </TableRow>
  
        {/* Collapsible section - with fixes */}
        {!appointment.isOpen && (
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box
                  sx={{
                    p: 2, // Reduced padding
                    my: 0.5, // Reduced margin
                    mx: 2,
                    borderRadius: 2,
                    bgcolor: "#f9fafb",
                    border: "1px solid #e0e0e0",
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    color="#2e7d32"
                    fontWeight="500"
                  >
                    Appointment Details
                  </Typography>
  
                  <Divider sx={{ mb: 2, borderColor: "#c8e6c9" }} />
  
                  <Grid container spacing={3}>
                    {/* Patient Information */}
                    <Grid gridSize={{ xs: 12, md: 6 }}>
                      <Box sx={styles.infoSection}>
                        <PersonIcon
                          sx={{ color: "#43a047", ...styles.sectionIcon }}
                        />
                        <Typography variant="subtitle1" sx={styles.sectionTitle}>
                          Patient Information
                        </Typography>
                      </Box>
                      <Box sx={styles.sectionContent}>
                        <Typography variant="body2">
                          <strong>Name:</strong> {appointment.patientName}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Phone:</strong> {appointment.phoneNumber}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Last Visit:</strong> {lastVisit}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Allergies:</strong> {allergies}
                        </Typography>
                        {insuranceInfo && (
                          <Typography variant="body2">
                            <strong>Insurance:</strong> {insuranceInfo}
                          </Typography>
                        )}
                      </Box>
                    </Grid>
  
                    {/* Appointment Information */}
                    <Grid gridSize={{ xs: 12, md: 6 }}>
                      <Box sx={styles.infoSection}>
                        <AccessTimeIcon
                          sx={{ color: "#43a047", ...styles.sectionIcon }}
                        />
                        <Typography variant="subtitle1" sx={styles.sectionTitle}>
                          Appointment Information
                        </Typography>
                      </Box>
                      <Box sx={styles.sectionContent}>
                        <Typography variant="body2">
                          <strong>Date:</strong> {appointment.date}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Time:</strong> {timeRange}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Treatment:</strong> {appointment.treatmentType}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Duration:</strong> 30 minutes
                        </Typography>
                        <Typography variant="body2">
                          <strong>Status:</strong>{" "}
                          <Chip
                            label="BOOKED"
                            size="small"
                            sx={{
                              bgcolor: "#66BB6A",
                              color: "white",
                              height: "20px",
                              fontSize: "0.7rem",
                              fontWeight: "bold",
                            }}
                          />
                        </Typography>
                      </Box>
                    </Grid>
  
                    {/* Notes/Comments */}
                    <Grid gridSize={{ xs: 12 }}>
                      <Box sx={styles.infoSection}>
                        <NotesIcon
                          sx={{ color: "#43a047", ...styles.sectionIcon }}
                        />
                        <Typography variant="subtitle1" sx={styles.sectionTitle}>
                          Notes
                        </Typography>
                      </Box>
                      <Box sx={styles.notesBox}>
                        <Typography variant="body2">{comments}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
  
                  {/* Actions */}
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "#4caf50",
                        "&:hover": { bgcolor: "#388e3c" },
                        mr: 1,
                      }}
                      startIcon={<EditIcon />}
                    >
                      Edit Details
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: "#4caf50",
                        color: "#4caf50",
                        "&:hover": {
                          borderColor: "#388e3c",
                          bgcolor: "rgba(76, 175, 80, 0.04)",
                        },
                      }}
                    >
                      View Patient History
                    </Button>
                  </Box>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        )}
      </>
    );
};

// Stats component for reusability
const StatCard = ({
    icon: Icon,
    iconColor,
    bgColor,
    title,
    value,
    subtext,
  }) => (
    <Box
      sx={{
        flex: "1 1 33.33%", // You can adjust the flex basis to control how it scales
        py: 0.5, // Reduced vertical padding
        px: 1,  // Reduced horizontal padding
        display: "flex",
        alignItems: "center",
        borderRight: "1px solid #e0e0e0",
        minWidth: 0,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: 24, // Reduced width of the icon container
          height: 24, // Reduced height of the icon container
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          backgroundColor: `rgba(${bgColor}, 0.1)`,
          mr: 0.8, // Reduced right margin
          flexShrink: 0,
        }}
      >
        <Icon sx={{ color: iconColor, fontSize: 16 }} /> {/* Reduced font size of the icon */}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5, // Reduced gap between elements
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: 12 }}>
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: iconColor,
            fontWeight: 600,
            fontSize: 14, // Reduced font size of value
          }}
        >
          {value}
        </Typography>
        {subtext && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              fontStyle: "italic",
              fontSize: 12, // Reduced font size of subtext
            }}
          >
            ({subtext})
          </Typography>
        )}
      </Box>
    </Box>
);
  
// Utility function to format date strings
const formatDateString = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric'
  });
};

const DateRangePicker = ({ startDate, endDate, onDateChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApply = () => {
    onDateChange(tempStartDate, tempEndDate);
    handleClose();
  };

  const handleStartDateChange = (e) => {
    setTempStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setTempEndDate(e.target.value);
  };

  const open = Boolean(anchorEl);
  const id = open ? "date-range-popover" : undefined;

  const displayDateRange = `${formatDateString(startDate)} - ${formatDateString(endDate)}`;

  return (
    <div className="inline-block">
      <Button
        variant="outlined"
        startIcon={<DateRangeIcon fontSize="small" />}
        onClick={handleClick}
        size="small"
        aria-describedby={id}
        sx={{
          color: "white",
          borderColor: "rgba(255,255,255,0.5)",
          "&:hover": {
            borderColor: "white",
            backgroundColor: "#388e3c",
          },
          borderRadius: "4px",
          px: 1.5,
          py: 0.5,
          fontSize: "0.80rem",
          fontWeight: "medium",
          textTransform: "none",
          minWidth: "auto",
        }}
      >
        {displayDateRange}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            width: '360px',
            borderRadius: '4px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(0, 0, 0, 0.08)'
          }
        }}
      >
        <div className="p-4">
          <Typography 
            variant="h6" 
            component="h2"
            sx={{ 
              fontWeight: 600, 
              color: '#1e293b',
              fontSize: '16px',
              mb: 2
            }}
          >
            Select Date Range
          </Typography>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Typography variant="caption" sx={{ mb: 0.5, fontWeight: 600, display: 'block', color: '#475569' }}>
                From Date
              </Typography>
              <TextField
                type="date"
                value={tempStartDate}
                onChange={handleStartDateChange}
                fullWidth
                size="small"
                InputProps={{
                  sx: {
                    borderRadius: '2px',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#cbd5e1'
                    }
                  }
                }}
                inputProps={{
                  max: tempEndDate,
                }}
              />
            </div>
            <div>
              <Typography variant="caption" sx={{ mb: 0.5, fontWeight: 600, display: 'block', color: '#475569' }}>
                To Date
              </Typography>
              <TextField
                type="date"
                value={tempEndDate}
                onChange={handleEndDateChange}
                fullWidth
                size="small"
                InputProps={{
                  sx: {
                    borderRadius: '2px',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#cbd5e1'
                    }
                  }
                }}
                inputProps={{
                  min: tempStartDate,
                }}
              />
            </div>
          </div>

          <div className="flex space-x-2 mb-4">
            <Button
              variant="text"
              size="small"
              onClick={() => {
                const today = new Date();
                const oneMonthAgo = new Date();
                oneMonthAgo.setMonth(today.getMonth() - 1);
                
                setTempStartDate(oneMonthAgo.toISOString().split('T')[0]);
                setTempEndDate(today.toISOString().split('T')[0]);
              }}
              sx={{
                color: '#3b82f6',
                fontSize: '0.75rem',
                textTransform: 'none',
                px: 2,
                py: 0.5,
                borderRadius: '2px',
                '&:hover': {
                  backgroundColor: 'rgba(59, 130, 246, 0.08)'
                }
              }}
            >
              Last Month
            </Button>
            <Button
              variant="text"
              size="small"
              onClick={() => {
                const today = new Date();
                const oneWeekAgo = new Date();
                oneWeekAgo.setDate(today.getDate() - 7);
                
                setTempStartDate(oneWeekAgo.toISOString().split('T')[0]);
                setTempEndDate(today.toISOString().split('T')[0]);
              }}
              sx={{
                color: '#3b82f6',
                fontSize: '0.75rem',
                textTransform: 'none',
                px: 2,
                py: 0.5,
                borderRadius: '2px',
                '&:hover': {
                  backgroundColor: 'rgba(59, 130, 246, 0.08)'
                }
              }}
            >
              Last Week
            </Button>
          </div>

          <div className="flex justify-end border-t border-gray-200 pt-3">
            <Button
              onClick={handleClose}
              size="small"
              sx={{ 
                color: "#64748b", 
                fontWeight: 400,
                textTransform: 'none',
                mr: 1
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleApply}
              variant="contained"
              size="small"
              disableElevation
              sx={{ 
                bgcolor: "#2563eb", 
                "&:hover": { bgcolor: "#1d4ed8" },
                borderRadius: '2px',
                fontWeight: 500,
                textTransform: 'none',
                px: 2,
                py: 0.75
              }}
            >
              Apply
            </Button>
          </div>
        </div>
      </Popover>
    </div>
  );
};

// Main Dashboard component
const Dashboard = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOpenSlot, setSelectedOpenSlot] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("slotTime");
  const [editingAppointment, setEditingAppointment] = useState(null);
  
  // Date range state
  const today = new Date();
  const sixDaysLater = new Date(today);
  sixDaysLater.setDate(today.getDate() + 6);
  
  const [dateRange, setDateRange] = useState({
    startDate: today.toISOString().split("T")[0],
    endDate: sixDaysLater.toISOString().split("T")[0],
  });
  
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    slotTime: "10:00",
    treatmentType: "Regular Checkup",
    phoneNumber: "",
    date: today.toISOString().split("T")[0],
    isOpen: false,
  });

  // Sample data - you would typically fetch this from an API
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "John Doe",
      slotTime: "10:00",
      treatmentType: "Regular Checkup",
      phoneNumber: "123 4567 890",
      date: "March 29, 2025",
      isOpen: false,
    },
    {
      id: 2,
      patientName: "Jane Smith",
      slotTime: "10:30",
      treatmentType: "Dental Cleaning",
      phoneNumber: "234 5678 901",
      date: "March 29, 2025",
      isOpen: false,
    },
    {
      id: 3,
      patientName: "",
      slotTime: "11:00",
      treatmentType: "",
      phoneNumber: "",
      date: "March 29, 2025",
      isOpen: true,
    },
    {
      id: 4,
      patientName: "Emily Davis",
      slotTime: "11:30",
      treatmentType: "Tooth Extraction",
      phoneNumber: "456 7890 123",
      date: "March 29, 2025",
      isOpen: false,
    },
    {
      id: 5,
      patientName: "",
      slotTime: "12:00",
      treatmentType: "",
      phoneNumber: "",
      date: "March 29, 2025",
      isOpen: true,
    },
    {
      id: 6,
      patientName: "Sarah Brown",
      slotTime: "12:30",
      treatmentType: "Regular Checkup",
      phoneNumber: "678 9012 345",
      date: "March 29, 2025",
      isOpen: false,
    },
    {
      id: 7,
      patientName: "David Taylor",
      slotTime: "13:00",
      treatmentType: "Dental Cleaning",
      phoneNumber: "789 0123 456",
      date: "March 29, 2025",
      isOpen: false,
    },
    {
      id: 8,
      patientName: "",
      slotTime: "13:30",
      treatmentType: "",
      phoneNumber: "",
      date: "March 29, 2025",
      isOpen: true,
    },
    {
      id: 9,
      patientName: "Thomas Martinez",
      slotTime: "17:00",
      treatmentType: "Root Canal",
      phoneNumber: "901 2345 678",
      date: "March 29, 2025",
      isOpen: false,
    },
    {
      id: 10,
      patientName: "",
      slotTime: "17:30",
      treatmentType: "",
      phoneNumber: "",
      date: "March 29, 2025",
      isOpen: true,
    },
    {
      id: 11,
      patientName: "James Clark",
      slotTime: "18:00",
      treatmentType: "Tooth Extraction",
      phoneNumber: "123 4567 890",
      date: "March 29, 2025",
      isOpen: false,
    },
    {
      id: 12,
      patientName: "",
      slotTime: "18:30",
      treatmentType: "",
      phoneNumber: "",
      date: "March 29, 2025",
      isOpen: true,
    },
    {
      id: 13,
      patientName: "Christopher Lewis",
      slotTime: "19:00",
      treatmentType: "Dental Cleaning",
      phoneNumber: "345 6789 012",
      date: "March 29, 2025",
      isOpen: false,
    },
    {
      id: 14,
      patientName: "Amanda Lee",
      slotTime: "19:30",
      treatmentType: "Consultation",
      phoneNumber: "456 7890 123",
      date: "March 29, 2025",
      isOpen: false,
    },
    {
      id: 15,
      patientName: "",
      slotTime: "20:00",
      treatmentType: "",
      phoneNumber: "",
      date: "March 29, 2025",
      isOpen: true,
    },
    {
      id: 16,
      patientName: "Michelle Hall",
      slotTime: "20:30",
      treatmentType: "Regular Checkup",
      phoneNumber: "678 9012 345",
      date: "March 29, 2025",
      isOpen: false,
    },
  ]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setSelectedOpenSlot(null);
    // Reset form with appropriate time based on selected tab
    setNewAppointment({
      patientName: "",
      slotTime: tabValue === 0 ? "10:00" : "17:00",
      treatmentType: "Regular Checkup",
      phoneNumber: "",
      date: today.toISOString().split("T")[0],
      isOpen: false,
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOpenSlot(null);
    setEditingAppointment(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment({
      ...newAppointment,
      [name]: value,
    });
  };

  const handleOpenSlotClick = (appointment) => {
    if (appointment.isOpen) {
      // Navigate to the book-appointments page with the slot details
      navigate("/book-appointments", {
        state: {
          slotTime: appointment.slotTime,
          date: appointment.date,
        },
      });
    }
  };

  const handleDateRangeChange = (startDate, endDate) => {
    setDateRange({ startDate, endDate });
    // Here you would typically fetch appointments for the new date range
    console.log(`Fetching appointments from ${startDate} to ${endDate}`);
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Format time from 24h to 12h with AM/PM
  const formatTime = (timeString) => {
    if (!timeString || typeof timeString !== "string") {
      return "10:00 AM"; // default if invalid
    }

    try {
      const [hours, minutes] = timeString.split(":").map(Number);
      const period = hours >= 12 ? "PM" : "AM";
      const hours12 = hours % 12 || 12;
      return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
    } catch (error) {
      console.error("Error formatting time:", error);
      return "10:00 AM"; // default if parsing fails
    }
  };

  // Calculate end time (assuming 30-minute slots)
  const calculateEndTime = (timeString) => {
    if (!timeString || typeof timeString !== "string") {
      return "10:30";
    }

    try {
      const [hours, minutes] = timeString.split(":").map(Number);
      let newHours = hours;
      let newMinutes = minutes + 30;
      
      if (newMinutes >= 60) {
        newHours = (newHours + 1) % 24;
        newMinutes = newMinutes - 60;
      }
      
      return `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(2, "0")}`;
    } catch (error) {
      console.error("Error calculating end time:", error);
      return "10:30"; // default if parsing fails
    }
  };

  // Sort function for table rows
  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Add this handler function
  const handleEditAppointment = (appointment) => {
    if (appointment.isOpen) return; // Shouldn't happen since Edit button is hidden for open slots
    
    // Convert the date back to YYYY-MM-DD format for the date input
    const dateParts = appointment.date.split(' ');
    const month = new Date(Date.parse(dateParts[0] + ' 1, ' + dateParts[2])).getMonth() + 1;
    const formattedDate = `${dateParts[2]}-${month.toString().padStart(2, '0')}-${dateParts[1].replace(',', '').padStart(2, '0')}`;
    
    setEditingAppointment(appointment);
    setNewAppointment({
      patientName: appointment.patientName,
      slotTime: appointment.slotTime,
      treatmentType: appointment.treatmentType,
      phoneNumber: appointment.phoneNumber,
      date: formattedDate,
      isOpen: false,
    });
    setOpenDialog(true);
  };

  // Update the handleSaveAppointment function
  const handleSaveAppointment = () => {
    // Validate required fields
    if (
      !newAppointment.patientName ||
      !newAppointment.phoneNumber ||
      !newAppointment.treatmentType
    ) {
      alert("Please fill all required fields");
      return;
    }

    let updatedAppointments;

    if (editingAppointment) {
      // Update the existing appointment
      updatedAppointments = appointments.map((app) =>
        app.id === editingAppointment.id
          ? {
              ...newAppointment,
              id: app.id,
              date: formatDate(newAppointment.date),
              isOpen: false,
            }
          : app
      );
    } else if (selectedOpenSlot) {
      // For Open Slot booking
      if (!selectedOpenSlot.isOpen) {
        alert("Cannot book a slot that is not marked as Open");
        return;
      }
      
      updatedAppointments = appointments.map((app) =>
        app.id === selectedOpenSlot.id
          ? {
              ...newAppointment,
              id: app.id,
              date: formatDate(newAppointment.date),
              isOpen: false,
            }
          : app
      );
    } else {
      // Add new appointment
      updatedAppointments = [
        ...appointments,
        {
          ...newAppointment,
          id: appointments.length + 1,
          date: formatDate(newAppointment.date),
        },
      ];
    }

    setAppointments(updatedAppointments);
    setOpenDialog(false);
    setEditingAppointment(null);
    setSelectedOpenSlot(null);
  };

  // Session summary stats
  const currentSession = tabValue === 0 ? "MORNING" : "EVENING";
  const { start, end } = SESSION_TIMES[currentSession];
  
  const sessionSlots = appointments.filter((app) => {
    const hour = parseInt(app.slotTime.split(":")[0]);
    return hour >= start && hour < end;
  });
  
  const bookedSlots = sessionSlots.filter((app) => !app.isOpen).length;
  const openSlots = sessionSlots.filter((app) => app.isOpen).length;
  const slotUtilization = sessionSlots.length > 0 
    ? Math.round((bookedSlots / sessionSlots.length) * 100) 
    : 0;

  // Date range display for the title
  const dateRangeTitle = `${formatDateString(dateRange.startDate)} - ${formatDateString(dateRange.endDate)}`;

  return (
    // <Container maxWidth="lg" sx={{ mt: 1, mb: 1 }}>
    <Container
        disableGutters
        sx={{ 
            mt: 1,
            mb: 1,
            width: "1280px", // or '80%', '100vw', whatever works
            maxWidth: "100%"
        }}
    >
        {/* Header Section */}
        <Box 
        sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: "#101828",
            boxShadow: 1,
            color: "white",
        }}
        >
            {/* Top Row: Title + Date Picker */}
            <Box 
                sx={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "flex-start", 
                flexWrap: "wrap",
                rowGap: 2,
                }}
            >
                <Box>
                <Typography variant="h5" component="h1" fontWeight="bold">
                    Appointment Dashboard
                </Typography>
                <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                    View and manage patient appointments
                </Typography>
                </Box>

                <Box>
                <DateRangePicker 
                    startDate={dateRange.startDate}
                    endDate={dateRange.endDate}
                    onDateChange={handleDateRangeChange}
                />
                </Box>
            </Box>

            {/* Stats Cards: Below Date Picker */}
            <Paper 
                elevation={0} 
                sx={{ 
                mt: 1, 
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                overflow: "hidden",
                bgcolor: "#ffffff", // optional darker tone for paper
                }}
            >
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <StatCard
                    icon={MedicalServicesIcon}
                    iconColor="#4caf50"
                    bgColor="76, 175, 80"
                    title="Total Appointments:"
                    value={bookedSlots}
                    subtext={`${sessionSlots.length} slots total`}
                />
                <StatCard
                    icon={EventAvailableIcon}
                    iconColor="#2196f3"
                    bgColor="33, 150, 243"
                    title="Available Slots:"
                    value={openSlots}
                />
                <StatCard
                    icon={SESSION_TIMES[currentSession].icon}
                    iconColor="#f57c00"
                    bgColor="245, 124, 0"
                    title="Utilization:"
                    value={`${slotUtilization}%`}
                />
                </Box>
            </Paper>
        </Box>

        {/* Tabs + Add Button */}
        <Box 
        sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            py: 0.5, // Reduced from default padding
            mt: 1,
            mb: 0.5
        }}
        >
        <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="session tabs"
            sx={{
            '& .MuiTabs-indicator': {
                backgroundColor: '#4caf50',
                height: 2, // Thinner indicator
            },
            minHeight: 36, // Reduced from default height
            '& .MuiTab-root': {
                minHeight: 36, // Smaller tabs
                py: 0.5, // Less vertical padding
            }
            }}
        >
            <Tab 
            icon={<WbSunnyIcon fontSize="small" />} // Smaller icon
            iconPosition="start" 
            label="MORNING SESSION" 
            sx={{ 
                '&.Mui-selected': { color: '#4caf50' },
                textTransform: 'none',
                fontWeight: 'medium',
                fontSize: '0.85rem', // Smaller text
            }}
            />
            <Tab 
            icon={<NightsStayIcon fontSize="small" />} // Smaller icon
            iconPosition="start" 
            label="EVENING SESSION" 
            sx={{ 
                '&.Mui-selected': { color: '#4caf50' },
                textTransform: 'none',
                fontWeight: 'medium',
                fontSize: '0.85rem', // Smaller text
            }}
            />
        </Tabs>
        <Button
            variant="contained"
            startIcon={<AddIcon fontSize="small" />} // Smaller icon
            onClick={handleOpenDialog}
            sx={{ 
            bgcolor: "#4caf50", 
            "&:hover": { bgcolor: "#388e3c" },
            py: 0.5, // Less padding
            height: 32, // Explicit height
            fontSize: '0.8rem' // Smaller text
            }}
        >
            Add New Patient Profile
        </Button>
        </Box>

      {/* Table */}
      <TableContainer 
        component={Paper} 
        sx={{ 
          boxShadow: "none", 
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          overflow: "hidden",
          width: "100%", // Ensure it takes full width
          tableLayout: "fixed" // Add this to stabilize the table layout
        }}
      >
        <Table aria-label="appointments table" sx={{ width: "100%", tableLayout: "fixed" }} >
            <TableHead sx={styles.tableHead}>
                <TableRow sx={{ height: '40px' }}>
                    {/* Empty column for spacing */}
                    <TableCell width="30px" padding="none"></TableCell>

                    {/* Adjusted Status header */}
                    <TableCell sx={{ py: 0.5, px: 1, textAlign: 'center' }}>
                    <TableSortLabel
                        active={orderBy === "isOpen"}
                        direction={orderBy === "isOpen" ? order : "asc"}
                        onClick={() => handleRequestSort("isOpen")}
                        sx={styles.tableSortLabel}
                    >
                        Status
                    </TableSortLabel>
                    </TableCell>

                    {/* Adjusted Patient Name header */}
                    <TableCell sx={{ textAlign: 'left' }}>
                    <TableSortLabel
                        active={orderBy === "patientName"}
                        direction={orderBy === "patientName" ? order : "asc"}
                        onClick={() => handleRequestSort("patientName")}
                        sx={styles.tableSortLabel}
                    >
                        Patient Name
                    </TableSortLabel>
                    </TableCell>

                    {/* Adjusted Treatment header */}
                    <TableCell sx={{ textAlign: 'left', pl: 6.2 }}>
                    <TableSortLabel
                        active={orderBy === "treatmentType"}
                        direction={orderBy === "treatmentType" ? order : "asc"}
                        onClick={() => handleRequestSort("treatmentType")}
                        sx={styles.tableSortLabel}
                    >
                        Treatment
                    </TableSortLabel>
                    </TableCell>

                    {/* Adjusted Phone header */}
                    <TableCell sx={{ textAlign: 'left', pl: 6.2 }}>
                    <TableSortLabel
                        active={orderBy === "phoneNumber"}
                        direction={orderBy === "phoneNumber" ? order : "asc"}
                        onClick={() => handleRequestSort("phoneNumber")}
                        sx={styles.tableSortLabel}
                    >
                        Phone
                    </TableSortLabel>
                    </TableCell>

                    {/* Adjusted Time header */}
                    <TableCell sx={{ textAlign: 'center' }}>
                    <TableSortLabel
                        active={orderBy === "slotTime"}
                        direction={orderBy === "slotTime" ? order : "asc"}
                        onClick={() => handleRequestSort("slotTime")}
                        sx={styles.tableSortLabel}
                    >
                        Time
                    </TableSortLabel>
                    </TableCell>

                    {/* Adjusted Date header */}
                    <TableCell sx={{ textAlign: 'left', pl: 5 }}>
                    <TableSortLabel
                        active={orderBy === "date"}
                        direction={orderBy === "date" ? order : "asc"}
                        onClick={() => handleRequestSort("date")}
                        sx={styles.tableSortLabel}
                    >
                        Date
                    </TableSortLabel>
                    </TableCell>

                    {/* Adjusted Actions header with extra padding */}
                    <TableCell sx={{ color: 'white', pr: 5, textAlign: 'center' }}>Actions</TableCell>
                </TableRow>
            </TableHead>
          <TableBody>
            {/* Filter appointments by session and sort them */}
            {appointments
              .filter((appointment) => {
                const hour = parseInt(appointment.slotTime.split(":")[0]);
                return hour >= start && hour < end;
              })
              .sort(getComparator(order, orderBy))
              .map((appointment) => (
                <AppointmentRow
                  key={appointment.id}
                  appointment={appointment}
                  handleOpenSlotClick={handleOpenSlotClick}
                  handleEditAppointment={handleEditAppointment} // Make sure this is passed
                  formatTime={formatTime}
                  calculateEndTime={calculateEndTime}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for adding/editing appointments */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { 
            borderRadius: '12px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)'
            
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            borderBottom: '1px solid #e0e0e0',
            py: 2.5,
            px: 3,
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#ffffff',
            backgroundColor: '#4caf50'
          }}
        >
          {editingAppointment ? "Edit Appointment" : selectedOpenSlot ? "Book Open Slot" : "Add New Appointment"}
        </DialogTitle>
        <DialogContent sx={{ p: 3, pt: 7 }}>
          <Grid container spacing={2.5} sx={{mt:3}}>
            <Grid gridSize={{ xs: 12 }}>
              <TextField
                label="Patient Name"
                name="patientName"
                value={newAppointment.patientName}
                onChange={handleInputChange}
                fullWidth
                required
                variant="outlined"
                size="small"
                InputLabelProps={{
                  sx: { fontSize: '0.9rem' }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#cbd5e1',
                    },
                    '&:hover fieldset': {
                      borderColor: '#94a3b8',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                    },
                    borderRadius: 1
                  },
                }}
              />
            </Grid>
            <Grid gridSize={{ xs: 12, sm: 6 }}>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={newAppointment.phoneNumber}
                onChange={handleInputChange}
                fullWidth
                required
                variant="outlined"
                size="small"
                InputLabelProps={{
                  sx: { fontSize: '0.9rem' }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#cbd5e1',
                    },
                    '&:hover fieldset': {
                      borderColor: '#94a3b8',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                    },
                    borderRadius: 1
                  },
                }}
              />
            </Grid>
            <Grid gridSize={{ xs: 12, sm: 6 }}>
              <FormControl 
                fullWidth 
                variant="outlined" 
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#cbd5e1',
                    },
                    '&:hover fieldset': {
                      borderColor: '#94a3b8',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                    },
                    borderRadius: 1
                  },
                }}
              >
                <InputLabel sx={{ fontSize: '0.9rem' }}>Treatment Type</InputLabel>
                <Select
                  name="treatmentType"
                  value={newAppointment.treatmentType}
                  onChange={handleInputChange}
                  required
                  label="Treatment Type"
                >
                  {TREATMENT_TYPES.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date"
                type="date"
                name="date"
                value={newAppointment.date}
                onChange={handleInputChange}
                fullWidth
                required
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                  sx: { fontSize: '0.9rem' }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#cbd5e1',
                    },
                    '&:hover fieldset': {
                      borderColor: '#94a3b8',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                    },
                    borderRadius: 1
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl 
                fullWidth 
                variant="outlined" 
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#cbd5e1',
                    },
                    '&:hover fieldset': {
                      borderColor: '#94a3b8',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                    },
                    borderRadius: 1
                  },
                }}
              >
                <InputLabel sx={{ fontSize: '0.9rem' }}>Time Slot</InputLabel>
                <Select
                  name="slotTime"
                  value={newAppointment.slotTime}
                  onChange={handleInputChange}
                  required
                  label="Time Slot"
                >
                  {generateTimeSlots(currentSession).map((slot) => (
                    <MenuItem key={slot.value} value={slot.value}>
                      {slot.display}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions 
          sx={{ 
            p: 3, 
            pt: 1.5,
            borderTop: '1px solid #e0e0e0',
            mt: 2
          }}
        >
          <Button 
            onClick={handleCloseDialog} 
            variant="outlined"
            sx={{ 
              color: "#475569",
              borderColor: "#cbd5e1",
              textTransform: "none",
              "&:hover": { 
                borderColor: "#94a3b8",
                backgroundColor: "rgba(203, 213, 225, 0.08)"
              },
              px: 2.5,
              borderRadius: 1
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveAppointment} 
            variant="contained"
            disableElevation
            sx={{ 
              backgroundColor: "#4caf50", 
              textTransform: "none",
              "&:hover": { 
                backgroundColor: "#4caf50" 
              },
              px: 2.5,
              borderRadius: 1
            }}
          >
            {selectedOpenSlot ? "Book Appointment" : "Add Appointment"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;