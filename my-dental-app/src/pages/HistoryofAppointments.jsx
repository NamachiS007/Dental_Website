import React, { useState, useEffect } from "react";
import { fetchAppointments } from "../services/appointmentService";
import { format, parseISO, isWithinInterval, startOfDay, endOfDay } from "date-fns";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Button,
  CircularProgress,
  Alert,
  InputAdornment,
  Avatar,
  Tooltip,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  Person as PersonIcon,
  Payment as PaymentIcon,
  FilterAlt as FilterIcon,
} from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CakeIcon from '@mui/icons-material/Cake';
import Stack from '@mui/material/Stack';
import EventIcon from '@mui/icons-material/Event';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

function AppointmentHistory() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("appointmentDate");
  const [filters, setFilters] = useState({
    patientId: "",
    paymentStatus: "all",
    appointmentDate: null,
    dob: null,
    dobDisplay: "",
    apptFromDisplay: "",
    apptToDisplay: "",
    appointmentFrom: null,
    appointmentTo: null,
  });
  const [showFilters, setShowFilters] = useState(true);
  const [dobPickerOpen, setDobPickerOpen] = useState(false);
  const [apptFromPickerOpen, setApptFromPickerOpen] = useState(false);
  const [apptToPickerOpen, setApptToPickerOpen] = useState(false);

  const descendingComparator = (a, b, orderBy) => {
    if (orderBy === "appointmentDate" || orderBy === "appointmentTime" || orderBy === "dateOfBirth") {
      return new Date(b[orderBy]) - new Date(a[orderBy]);
    }

    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
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

  const createSortHandler = (property) => () => {
    handleRequestSort(property);
  };

  useEffect(() => {
    const getAppointments = async () => {
      try {
        setLoading(true);
        const data = await fetchAppointments();
        setAppointments(data);
        setError(null);
      } catch (err) {
        setError("Failed to load appointments. Please try again later.");
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    getAppointments();
  }, []);

  // Add this useEffect to handle screen size changes
  useEffect(() => {
    // Always show filters when not in mobile view
    if (!isMobile) {
      setShowFilters(true);
    }
  }, [isMobile]);

  // ... rest of your existing code ...

  const toggleFilters = () => {
    // Only allow toggling in mobile view
    if (isMobile) {
      setShowFilters(!showFilters);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      patientId: "",
      paymentStatus: "all",
      appointmentDate: null,
      dob: null,
      dobDisplay: "",
      apptFromDisplay: "",
      apptToDisplay: "",
      appointmentFrom: null,
      appointmentTo: null,
    });
    setSearchTerm("");
  };

  const getPaymentStatusChipProps = (status) => {
    const statusStr = (status || '').toString().toLowerCase();
    switch (statusStr) {
      case "paid":
        return { color: "success", variant: "outlined", icon: "✓" };
      case "unpaid":
        return { color: "error", variant: "outlined", icon: "✕" };
      case "partial":
        return { color: "warning", variant: "outlined", icon: "~" };
      case "pending":
        return { color: "info", variant: "outlined", icon: "⏱" };
      default:
        return { color: "default", variant: "outlined", icon: "" };
    }
  };

  const formatDateTime = (dateTime) => {
    try {
      return format(new Date(dateTime), "PPp");
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateTime;
    }
  };

  const formatDate = (date) => {
    try {
      return date ? format(new Date(date), "PP") : "-";
    } catch (error) {
      console.error("Error formatting date:", error);
      return date || "-";
    }
  };

  const formatTime = (time) => {
    try {
      return time ? format(new Date(time), "p") : "-";
    } catch (error) {
      console.error("Error formatting time:", error);
      return time || "-";
    }
  };

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getAvatarColor = (name) => {
    if (!name) return "#1976d2";
    const colors = [
      '#1976d2', '#388e3c', '#d32f2f', '#7b1fa2', 
      '#c2185b', '#f57c00', '#0288d1', '#303f9f'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const anyFiltersActive = 
    filters.patientId !== "" || 
    filters.paymentStatus !== "all" || 
    filters.appointmentDate !== null ||
    filters.dob !== null ||
    searchTerm !== "";

  const filteredAppointments = appointments
    .filter((appointment) => {
      const matchesSearch =
        searchTerm === "" ||
        (appointment.patientName && 
          appointment.patientName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (appointment.doctorName && 
          appointment.doctorName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (appointment.appointmentType && 
          appointment.appointmentType
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (appointment.reasonForVisit && 
          appointment.reasonForVisit
            .toLowerCase()
            .includes(searchTerm.toLowerCase()));

      const matchesPatientId =
        filters.patientId === "" ||
        (appointment.patientId && 
          appointment.patientId.toString().includes(filters.patientId));

      const matchesPaymentStatus =
        filters.paymentStatus === "all" ||
        ((appointment.paymentStatus || '').toLowerCase() === filters.paymentStatus.toLowerCase());

      const matchesAppointmentDate =
        !filters.appointmentDate || 
        (appointment.appointmentDate && 
          isWithinInterval(parseISO(appointment.appointmentDate), {
            start: startOfDay(filters.appointmentDate),
            end: endOfDay(filters.appointmentDate),
          }));

      const matchesDob =
        !filters.dob ||
        (appointment.dateOfBirth &&
          isWithinInterval(parseISO(appointment.dateOfBirth), {
            start: startOfDay(filters.dob),
            end: endOfDay(filters.dob),
          }));

      return (
        matchesSearch &&
        matchesPatientId &&
        matchesPaymentStatus &&
        matchesAppointmentDate &&
        matchesDob
      );
    })
    .sort(getComparator(order, orderBy));

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="300px"
      >
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      width: '100%',
      maxWidth: '1400px',
      margin: '0 auto',
      padding: isMobile ? '5px 8px' : '5px 16px'
    }}>
      {/* Filters section */}
      <Paper 
        elevation={0}
        sx={{ 
          p: isMobile ? 1 : 1.3,
          mb: 0.5,
          mt: 0.5,
          backgroundColor: 'background.paper',
          borderRadius: 2,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}
      >
        {isMobile && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle2">Filters</Typography>
            <IconButton onClick={toggleFilters} size="small">
              <FilterIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
        
        {showFilters && (
          <Stack 
            direction={isMobile ? "column" : "row"} 
            spacing={isMobile ? 1 : 1} 
            alignItems="center"
            sx={{ 
              width: '100%',
              flexWrap: { xs: 'wrap', lg: 'nowrap' },
              '& > *': { 
                flexGrow: 1,
                width: isMobile ? '100%' : 'auto'
              }
            }}
          >
            {/* Patient ID */}
            <TextField
              placeholder="Patient ID"
              variant="outlined"
              size="small"
              value={filters.patientId}
              onChange={(e) => handleFilterChange("patientId", e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="action" sx={{ fontSize: '1.1rem' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                minWidth: isMobile ? '100%' : '120px',
                flexBasis: isMobile ? '100%' : '15%',
                '& .MuiOutlinedInput-root': {
                  height: '38px',
                  borderRadius: 4,
                  fontSize: '0.875rem',
                  backgroundColor: '#f9f9f9'
                }
              }}
            />

            {/* Search Field */}
            <TextField
              placeholder="Search..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" sx={{ fontSize: '1.1rem' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                minWidth: isMobile ? '100%' : '150px',
                flexBasis: isMobile ? '100%' : '25%',
                '& .MuiOutlinedInput-root': {
                  height: '38px',
                  borderRadius: 4,
                  fontSize: '0.875rem',
                  backgroundColor: '#f9f9f9'
                }
              }}
            />

            {/* Payment Status Dropdown */}
            <FormControl 
              size="small" 
              sx={{ 
                minWidth: isMobile ? '100%' : '90px',
                flexBasis: isMobile ? '100%' : '12%'
              }}
            >
              <Select
                displayEmpty
                value={filters.paymentStatus || 'all'}
                onChange={(e) => handleFilterChange("paymentStatus", e.target.value)}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PaymentIcon sx={{ fontSize: '1.1rem', mr: 0.8, color: 'action.active' }} />
                    <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                      {selected === 'all' ? 'all' : selected}
                    </Typography>
                  </Box>
                )}
                sx={{ 
                  height: '38px',
                  borderRadius: 4,
                  backgroundColor: '#f9f9f9',
                  '& .MuiSelect-select': { 
                    paddingY: 0,
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '0.875rem'
                  }
                }}
              >
                <MenuItem value="all" sx={{ fontSize: '0.875rem' }}>All</MenuItem>
                <MenuItem value="paid" sx={{ fontSize: '0.875rem' }}>Paid</MenuItem>
                <MenuItem value="unpaid" sx={{ fontSize: '0.875rem' }}>Unpaid</MenuItem>
                <MenuItem value="partial" sx={{ fontSize: '0.875rem' }}>Partial</MenuItem>
                <MenuItem value="pending" sx={{ fontSize: '0.875rem' }}>Pending</MenuItem>
              </Select>
            </FormControl>

            {/* DOB - Custom Styled Date Field */}
            <Box
              sx={{
                minWidth: isMobile ? '100%' : '120px',
                flexBasis: isMobile ? '100%' : '12%',
                position: 'relative'
              }}
            >
              <TextField
                placeholder="MM/DD"
                variant="outlined"
                size="small"
                value={filters.dobDisplay || ''}
                onClick={() => setDobPickerOpen(true)}
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <CakeIcon color="action" sx={{ fontSize: '1.1rem' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <CalendarTodayIcon color="action" sx={{ fontSize: '1.1rem' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    height: '38px',
                    borderRadius: 4,
                    fontSize: '0.875rem',
                    backgroundColor: '#f9f9f9',
                    cursor: 'pointer'
                  }
                }}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  open={dobPickerOpen}
                  onClose={() => setDobPickerOpen(false)}
                  value={filters.dob}
                  onChange={(newValue) => {
                    handleFilterChange("dob", newValue);
                    handleFilterChange("dobDisplay", newValue ? format(newValue, 'MM/dd') : '');
                    setDobPickerOpen(false);
                  }}
                  PopperProps={{
                    sx: { zIndex: 1300 }
                  }}
                  slotProps={{
                    textField: { sx: { display: 'none' } }
                  }}
                />
              </LocalizationProvider>
            </Box>

            {/* Appointment From - Custom Styled Date Field */}
            <Box
              sx={{
                minWidth: isMobile ? '100%' : '120px',
                flexBasis: isMobile ? '100%' : '12%',
                position: 'relative'
              }}
            >
              <TextField
                placeholder="MM/DD"
                variant="outlined"
                size="small"
                value={filters.apptFromDisplay || ''}
                onClick={() => setApptFromPickerOpen(true)}
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <EventIcon color="action" sx={{ fontSize: '1.1rem' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <CalendarTodayIcon color="action" sx={{ fontSize: '1.1rem' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    height: '38px',
                    borderRadius: 4,
                    fontSize: '0.875rem',
                    backgroundColor: '#f9f9f9',
                    cursor: 'pointer'
                  }
                }}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  open={apptFromPickerOpen}
                  onClose={() => setApptFromPickerOpen(false)}
                  value={filters.appointmentFrom}
                  onChange={(newValue) => {
                    handleFilterChange("appointmentFrom", newValue);
                    handleFilterChange("apptFromDisplay", newValue ? format(newValue, 'MM/dd') : '');
                    setApptFromPickerOpen(false);
                  }}
                  PopperProps={{
                    sx: { zIndex: 1300 }
                  }}
                  slotProps={{
                    textField: { sx: { display: 'none' } }
                  }}
                />
              </LocalizationProvider>
            </Box>

            {/* Appointment To - Custom Styled Date Field */}
            <Box
              sx={{
                minWidth: isMobile ? '100%' : '120px',
                flexBasis: isMobile ? '100%' : '12%',
                position: 'relative'
              }}
            >
              <TextField
                placeholder="MM/DD"
                variant="outlined"
                size="small"
                value={filters.apptToDisplay || ''}
                onClick={() => setApptToPickerOpen(true)}
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <EventIcon color="action" sx={{ fontSize: '1.1rem' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <CalendarTodayIcon color="action" sx={{ fontSize: '1.1rem' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    height: '38px',
                    borderRadius: 4,
                    fontSize: '0.875rem',
                    backgroundColor: '#f9f9f9',
                    cursor: 'pointer'
                  }
                }}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  open={apptToPickerOpen}
                  onClose={() => setApptToPickerOpen(false)}
                  value={filters.appointmentTo}
                  onChange={(newValue) => {
                    handleFilterChange("appointmentTo", newValue);
                    handleFilterChange("apptToDisplay", newValue ? format(newValue, 'MM/dd') : '');
                    setApptToPickerOpen(false);
                  }}
                  PopperProps={{
                    sx: { zIndex: 1300 }
                  }}
                  slotProps={{
                    textField: { sx: { display: 'none' } }
                  }}
                />
              </LocalizationProvider>
            </Box>

            {/* Clear Button */}
            <Button
              variant="text"
              color="inherit"
              onClick={clearFilters}
              size="small"
              sx={{
                height: '38px',
                borderRadius: 4,
                textTransform: 'none',
                fontSize: '0.875rem',
                color: 'white',
                border: '1px solid red',
                backgroundColor: 'red',
                minWidth: isMobile ? '100%' : '80px',
                flexBasis: isMobile ? '100%' : '12%',
                '&:hover': {
                  backgroundColor: '#e60000',
                  borderColor: 'darkred',
                },
                '&:disabled': {
                  backgroundColor: '#f9f9f9',
                  color: '#b0b0b0',
                  border: '1px solid #e0e0e0',
                }
              }}
              disabled={!anyFiltersActive}
            >
              Clear
            </Button>
          </Stack>
        )}
      </Paper>

      {/* Results count */}
      <Box sx={{ 
        mb: 1, 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between', 
        alignItems: isMobile ? 'flex-start' : 'center',
        padding: '0 4px',
        gap: isMobile ? 0.5 : 0
      }}>
        <Typography variant="body2" color="text.secondary" fontSize="0.875rem">
          Showing {filteredAppointments.length} of {appointments.length} appointments
        </Typography>
        {order && (
          <Typography variant="body2" color="text.secondary" fontSize="0.875rem">
            Sorted by {orderBy} ({order === 'asc' ? 'ascending' : 'descending'})
          </Typography>
        )}
      </Box>

      {/* Appointment Table */}
      <Box sx={{ 
        width: '100%', 
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        overflow: 'hidden'
      }}>
        {filteredAppointments.length === 0 ? (
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '300px'
            }}
          >
            <Typography color="text.secondary" fontSize="0.9rem">
              No appointments found
            </Typography>
          </Box>
        ) : (
          <Box sx={{ 
            width: '100%',
            overflowX: 'auto',
            position: 'relative',
            minHeight: '515px',
            maxHeight: isMobile ? 'calc(100vh - 250px)' : 'calc(112vh - 330px)'
          }}>
            {/* Synchronized scrolling container */}
            <Box sx={{ 
              width: '100%',
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: '8px',
                height: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#cbd5e1',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#f1f5f9',
              },
            }}>
              <Table size="small" sx={{ 
                minWidth: isMobile ? 800 : 650, 
                tableLayout: 'fixed'
              }}>
                {/* Sticky Header */}
                <TableHead sx={{
                  position: 'sticky',
                  top: 0,
                  zIndex: 2,
                  backgroundColor: "#f5f7fa",
                }}>
                  <TableRow sx={{ 
                    '& th': { 
                      fontWeight: '600', 
                      color: '#4a5568',
                      py: 0.40,
                      fontSize: '0.8125rem',
                      borderBottom: '1px solid #e2e8f0',
                      minWidth: isMobile ? '100px' : 'auto'
                    }
                  }}>
                    <TableCell sortDirection={orderBy === "patientId" ? order : false}>
                      <TableSortLabel
                        active={orderBy === "patientId"}
                        direction={orderBy === "patientId" ? order : "asc"}
                        onClick={createSortHandler("patientId")}
                        sx={{ fontSize: '0.8125rem' }}
                      >
                        Patient ID
                      </TableSortLabel>
                    </TableCell>
                    <TableCell sortDirection={orderBy === "patientName" ? order : false}>
                      <TableSortLabel
                        active={orderBy === "patientName"}
                        direction={orderBy === "patientName" ? order : "asc"}
                        onClick={createSortHandler("patientName")}
                        sx={{ fontSize: '0.8125rem' }}
                      >
                        Patient Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell sortDirection={orderBy === "doctorName" ? order : false}>
                      <TableSortLabel
                        active={orderBy === "doctorName"}
                        direction={orderBy === "doctorName" ? order : "asc"}
                        onClick={createSortHandler("doctorName")}
                        sx={{ fontSize: '0.8125rem' }}
                      >
                        Doctor
                      </TableSortLabel>
                    </TableCell>
                    <TableCell sortDirection={orderBy === "appointmentDate" ? order : false}>
                      <TableSortLabel
                        active={orderBy === "appointmentDate"}
                        direction={orderBy === "appointmentDate" ? order : "asc"}
                        onClick={createSortHandler("appointmentDate")}
                        sx={{ fontSize: '0.8125rem' }}
                      >
                        App.Date
                      </TableSortLabel>
                    </TableCell>
                    <TableCell sortDirection={orderBy === "appointmentTime" ? order : false}>
                      <TableSortLabel
                        active={orderBy === "appointmentTime"}
                        direction={orderBy === "appointmentTime" ? order : "asc"}
                        onClick={createSortHandler("appointmentTime")}
                        sx={{ fontSize: '0.8125rem' }}
                      >
                        App.Time
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>App.Type</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell>Notes</TableCell>
                    <TableCell>Created By</TableCell>
                    <TableCell sortDirection={orderBy === "paymentStatus" ? order : false}>
                      <TableSortLabel
                        active={orderBy === "paymentStatus"}
                        direction={orderBy === "paymentStatus" ? order : "asc"}
                        onClick={createSortHandler("paymentStatus")}
                        sx={{ fontSize: '0.8125rem' }}
                      >
                        Payment Status
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                
                <TableBody>
                  {filteredAppointments.map((appointment) => {
                    const { color, variant, icon } = getPaymentStatusChipProps(appointment.paymentStatus);
                    return (
                      <TableRow 
                        hover 
                        key={appointment.id} 
                        sx={{ 
                          backgroundColor: 'white',
                          '&:hover': { backgroundColor: '#f8fafc' },
                          '& td': { 
                            py: isMobile ? 1 : 1.5, 
                            fontSize: '0.8125rem',
                            borderBottom: '1px solid #e2e8f0'
                          }
                        }}
                      >
                        <TableCell sx={{ fontWeight: '500', color: '#1e293b' }}>
                          #{appointment.patientId || '-'}
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar 
                              sx={{ 
                                width: 28, 
                                height: 28, 
                                bgcolor: getAvatarColor(appointment.patientName),
                                fontSize: '0.75rem'
                              }}
                            >
                              {getInitials(appointment.patientName)}
                            </Avatar>
                            <Typography variant="body2" fontSize="0.8125rem" color="#1e293b">
                              {appointment.patientName || '-'}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontSize="0.8125rem" color="#1e293b">
                            {appointment.doctorName ? `Dr. ${appointment.doctorName}` : '-'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontSize="0.8125rem" color="#1e293b">
                            {formatDate(appointment.appointmentDate)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontSize="0.8125rem" color="#1e293b">
                            {formatTime(appointment.appointmentTime)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontSize="0.8125rem" color="#1e293b">
                            {appointment.appointmentType || '-'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Tooltip title={appointment.reasonForVisit || '-'} arrow placement="top">
                            <Typography 
                              variant="body2" 
                              fontSize="0.8125rem" 
                              color="#1e293b"
                              sx={{
                                maxWidth: '150px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}
                            >
                              {appointment.reasonForVisit || '-'}
                            </Typography>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <Tooltip title={appointment.notes || '-'} arrow placement="top">
                            <Typography 
                              variant="body2" 
                              fontSize="0.8125rem" 
                              color="#1e293b"
                              sx={{
                                maxWidth: '150px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}
                            >
                              {appointment.notes || '-'}
                            </Typography>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontSize="0.8125rem" color="#1e293b">
                            {appointment.createdBy || '-'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={appointment.paymentStatus || 'unknown'}
                            color={color}
                            variant={variant}
                            size="small"
                            icon={icon ? <span style={{ marginLeft: 4 }}>{icon}</span> : undefined}
                            sx={{ 
                              height: '24px',
                              fontSize: '0.75rem',
                              fontWeight: 500,
                              borderRadius: '12px',
                              textTransform: 'capitalize',
                              '& .MuiChip-label': {
                                paddingLeft: icon ? 0 : undefined
                              }
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default AppointmentHistory;