import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Link, 
  Checkbox, 
  FormControlLabel,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Forgot Password State
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // Reusable TextField styling
  const textFieldStyle = {
    mb: 2,
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#1E293B',
      '& fieldset': { 
        borderColor: '#334155', 
        borderRadius: '8px'
      },
      '&:hover fieldset': { borderColor: '#475569' },
      '&.Mui-focused fieldset': { borderColor: '#FF8303' },
    },
    '& .MuiInputBase-input': { 
      color: '#FFFFFF',
      padding: '12px 14px',
      '&:-webkit-autofill': {
        WebkitTextFillColor: '#FFFFFF',
        WebkitBoxShadow: '0 0 0 100px #1E293B inset',
        transition: 'background-color 5000s ease-in-out 0s'
      }
    },
    '& .MuiInputLabel-root': { 
      color: '#94A3B8',
      '&.Mui-focused': { color: '#FF8303' }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // For demo, check if credentials match test account
      if (email === 'namachissnv@gmail.com' && password === '@Password123') {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const userData = {
          email: email,
          name: 'Test User',
          avatar: '/default-avatar.png',
          role: 'user'
        };
        
        login(userData); // Save user to context
        
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          sessionStorage.setItem('user', JSON.stringify(userData));
        }
        
        navigate('/dashboard');
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError(err.message);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!forgotEmail) {
      setError('Please enter your email address');
      setOpenSnackbar(true);
      return;
    }
    
    setForgotPasswordLoading(true);
    
    try {
      // Simulate API call to send password reset email
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setResetEmailSent(true);
    } catch (err) {
      setError('Failed to send password reset email. Please try again.');
      setOpenSnackbar(true);
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  const handleCloseForgotPassword = () => {
    setForgotPasswordOpen(false);
    setForgotEmail('');
    setResetEmailSent(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: "rgba(0, 0, 0, 0.98)",
        padding: '0',
        margin: '0',
        overflow: 'hidden',
        backgroundImage: 'url(/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Error Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      {/* Forgot Password Dialog */}
      <Dialog 
        open={forgotPasswordOpen} 
        onClose={handleCloseForgotPassword}
        PaperProps={{
          sx: {
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            borderRadius: '12px',
            maxWidth: '400px',
            width: '100%'
          }
        }}
      >
        <DialogTitle sx={{ color: '#FFFFFF', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Reset Password
        </DialogTitle>
        <DialogContent>
          {!resetEmailSent ? (
            <>
              <DialogContentText sx={{ color: '#94A3B8', mb: 2 }}>
                Enter your email address and we'll send you a link to reset your password.
              </DialogContentText>
              <TextField
                autoFocus
                fullWidth
                label="Email Address"
                variant="outlined"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                type="email"
                required
                sx={textFieldStyle}
              />
            </>
          ) : (
            <DialogContentText sx={{ color: '#94A3B8' }}>
              Password reset email sent! Please check your inbox and follow the instructions to reset your password.
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions sx={{ padding: '0 24px 20px' }}>
          {!resetEmailSent ? (
            <>
              <Button 
                onClick={handleCloseForgotPassword} 
                sx={{ 
                  color: '#94A3B8',
                  '&:hover': { backgroundColor: 'rgba(148, 163, 184, 0.1)' }
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleForgotPassword}
                disabled={forgotPasswordLoading} 
                sx={{
                  backgroundColor: '#FF8303',
                  color: '#FFFFFF',
                  '&:hover': { backgroundColor: '#FF6B00' },
                  '&.Mui-disabled': {
                    backgroundColor: '#FFA726',
                    color: '#FFFFFF'
                  }
                }}
              >
                {forgotPasswordLoading ? (
                  <CircularProgress size={24} sx={{ color: 'white' }} />
                ) : (
                  'Send Reset Link'
                )}
              </Button>
            </>
          ) : (
            <Button 
              onClick={handleCloseForgotPassword}
              sx={{
                backgroundColor: '#FF8303',
                color: '#FFFFFF',
                '&:hover': { backgroundColor: '#FF6B00' }
              }}
            >
              Close
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Box 
        sx={{ 
          width: '100%', 
          maxWidth: '400px', 
          background: '#0F172A',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Logo and branding */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
            Dental<span style={{ color: '#FF8303' }}>Care</span>
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#9CA3AF', mt: 1 }}>
            Your smile is our priority
          </Typography>
        </Box>

        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 'bold', 
            mb: 3, 
            color: '#FFFFFF', 
            textAlign: 'center' 
          }}
        >
          Welcome Back
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@example.com"
            required
            sx={textFieldStyle}
          />

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: '#94A3B8' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={textFieldStyle}
          />

          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 3 
            }}
          >
            <FormControlLabel
              control={
                <Checkbox 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  sx={{ 
                    color: '#64748B', 
                    '&.Mui-checked': { color: '#FF8303' } 
                  }} 
                />
              }
              label={
                <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                  Remember me
                </Typography>
              }
            />
            <Link 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setForgotPasswordOpen(true);
              }}
              variant="body2" 
              sx={{ 
                color: '#FF8303', 
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Forgot password?
            </Link>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: '#FF8303',
              color: '#FFFFFF',
              padding: '12px',
              textTransform: 'none',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#FF6B00',
              },
              '&.Mui-disabled': {
                backgroundColor: '#FFA726',
                color: '#FFFFFF'
              }
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;