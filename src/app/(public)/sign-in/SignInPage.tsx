// app/(public)/sign-in/SignInPage.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Typography from '@mui/material/Typography';
import Link from '@create/core/Link';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import { lighten } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { Alert, Button, TextField } from '@mui/material';

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      console.log('signIn result:', result); // Debug: Log signIn result

      if (result?.error) {
        throw new Error(result.error);
      }

      router.replace('/apps/environment-developer');
    } catch (err: any) {
      console.error('signIn error:', err); // Debug: Log error
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center sm:flex-row sm:justify-center md:items-start md:justify-start">
      <Paper className="h-full w-full px-4 py-2 ltr:border-r-1 rtl:border-l-1 sm:h-auto sm:w-auto sm:rounded-xl sm:p-12 sm:shadow-sm md:flex md:h-full md:w-1/2 md:items-center md:justify-end md:rounded-none md:p-16 md:shadow-none">
        <CardContent className="mx-auto w-full max-w-80 sm:mx-0 sm:w-80">
          <img
            className="w-12"
            src="/assets/images/logo/logo.svg"
            alt="logo"
          />
          <Typography className="mt-8 text-4xl font-extrabold leading-[1.25] tracking-tight text-black">
            Sign in
          </Typography>
          <div className="mt-0.5 flex items-baseline font-medium">
            <Typography className="text-black">Need an account?</Typography>
            <Link className="ml-1" to="/sign-up">
              Sign up
            </Link>
          </div>
          <div className="mt-0.5 font-medium">
            <Link to="/forgot-password">
              Forgot Password?
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
              Sign In
            </Button>
          </Box>
        </CardContent>
      </Paper>
      <Box
        className="relative hidden h-full flex-auto items-center justify-center overflow-hidden p-16 md:flex lg:px-28"
        sx={{ backgroundColor: lighten('#f5f5f5', 0.5), color: 'text.primary' }}
      >
        <div className="relative z-10 w-full max-w-4xl">
          <div className="text-7xl font-bold leading-none text-gray-800">
            <div>Environment Development Simulation</div>
          </div>
          <div className="mt-8 flex items-center">
            <AvatarGroup max={4}>
              <Avatar src="/assets/images/avatars/avatar1.jpg" />
              <Avatar src="/assets/images/avatars/avatar2.jpg" />
              <Avatar src="/assets/images/avatars/avatar3.jpg" />
              <Avatar src="/assets/images/avatars/avatar4.jpg" />
            </AvatarGroup>
            <div className="ml-4 font-medium tracking-tight text-gray-600">
              Your portal to create a universe and run any simulation, any time.
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default SignInPage;