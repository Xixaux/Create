// C:\Projects\Create_WebRelease\...\active_theme\src\app\sign-up\page.tsx (Assuming this is the location)

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import Link from '@create/core/Link';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Alert, Button, TextField } from '@mui/material';
// 1. Import signIn from next-auth/react
import { signIn } from 'next-auth/react'; 
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Step 1: Register the user with the backend
      const registerResponse = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });

      if (!registerResponse.ok) {
        const data = await registerResponse.json();
        throw new Error(data.message || 'Registration failed');
      }

      // We don't need to read the data or store it in localStorage here.

      // Step 2: Use next-auth's signIn function to establish the session.
      // We pass 'credentials' to use the CredentialsProvider in @auth/authJs.ts.
      // This will internally call your /api/Auth/login (via authorize in authJs.ts).
      const signInResult = await signIn('credentials', {
        email,
        password,
        redirect: false, // Prevent next-auth from redirecting automatically
        // You might need to set a callbackUrl here if your flow requires it, 
        // but for now, we'll manually redirect on success.
      });

      if (signInResult?.error) {
        // Handle next-auth sign in error (e.g., if the login fails right after registration)
        throw new Error(signInResult.error || 'Login failed after registration.');
      }
      
      // Step 3: Manual Redirect after successful session establishment
      // next-auth's session should now be active, stopping the "blinking."
      router.push('/apps/environment-developer'); // Redirect to the dashboard page

    } catch (err: any) {
      // Handle either registration or post-registration sign-in error
      setError(err.message);
    }
  };

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center sm:flex-row sm:justify-center md:items-start md:justify-start">
      <Paper className="h-full w-full px-4 py-2 ltr:border-r-1 rtl:border-l-1 sm:h-auto sm:w-auto sm:rounded-xl sm:p-12 sm:shadow-sm md:flex md:h-full md:w-1/2 md:items-center md:justify-end md:rounded-none md:p-16 md:shadow-none">
        <div className="mx-auto w-full max-w-80 sm:mx-0 sm:w-80">
          <img
            className="w-12"
            src="/assets/images/logo/logo.svg"
            alt="logo"
          />
          <Typography className="mt-8 text-4xl font-extrabold leading-[1.25] tracking-tight">
            Sign up
          </Typography>
          <div className="mt-0.5 flex items-baseline font-medium">
            <Typography>Already have an account?</Typography>
            <Link className="ml-1" to="/sign-in">
              Sign in
            </Link>
          </div>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              mt: 4,
              maxWidth: 320,
              mx: 'auto',
            }}
          >
            {error && (
              <Alert
                severity="error"
                sx={(theme) => ({
                  backgroundColor: theme.palette.error.light,
                  color: theme.palette.error.dark,
                })}
              >
                {error}
              </Alert>
            )}
            <TextField
              label="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, py: 1.5, fontWeight: 'medium' }}
            >
              Sign Up
            </Button>
          </Box>
        </div>
      </Paper>
      <Box
        className="relative hidden h-full flex-auto items-center justify-center overflow-hidden p-16 md:flex lg:px-28"
        sx={{ backgroundColor: 'primary.dark', color: 'primary.contrastText' }}
      >
        <svg
          className="pointer-events-none absolute inset-0"
          viewBox="0 0 960 540"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Box
            component="g"
            className="opacity-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="100"
          >
            <circle r="234" cx="196" cy="23" />
            <circle r="234" cx="790" cy="491" />
          </Box>
        </svg>
        <Box
          component="svg"
          className="absolute -right-16 -top-16 opacity-20"
          sx={{ color: 'primary.light' }}
          viewBox="0 0 220 192"
          width="220px"
          height="192px"
          fill="none"
        >
          <defs>
            <pattern
              id="837c3e70-6c3a-44e6-8854-cc48c737b659"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width="220"
            height="192"
            fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
          />
        </Box>
        <div className="relative z-10 w-full max-w-4xl">
          <div className="text-7xl font-bold leading-none text-gray-100">
            <div>Welcome to</div>
            <div>our community</div>
          </div>
          <div className="mt-6 text-lg leading-6 tracking-tight text-gray-400">
            Create helps developers to build organized and well coded dashboards full of beautiful and rich
            modules. Join us and start building your application today.
          </div>
          <div className="mt-8 flex items-center">
            <AvatarGroup
              sx={{
                '& .MuiAvatar-root': { borderColor: 'secondary.main' },
              }}
            >
              <Avatar src="/assets/images/avatars/female-18.jpg" />
              <Avatar src="/assets/images/avatars/female-11.jpg" />
              <Avatar src="/assets/images/avatars/male-09.jpg" />
              <Avatar src="/assets/images/avatars/male-16.jpg" />
            </AvatarGroup>
            <div className="ml-4 font-medium tracking-tight text-gray-400">
              More than 17k people joined us, it's your turn
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default SignUpPage;