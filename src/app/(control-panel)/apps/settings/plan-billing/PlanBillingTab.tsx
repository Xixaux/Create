'use client';

import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import _ from 'lodash';
import clsx from 'clsx';
import Paper from '@mui/material/Paper';
import CreateSvgIcon from '@create/core/CreateSvgIcon';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { useState } from 'react';
import { Box } from '@mui/material'; // Added Box for layout

/**
 * Services and Subscriptions Settings Tab
 */

type FormType = {
  plan: 'personal' | 'team' | 'enterprise'; // Changed 'basic' to 'personal' in the type
  cardHolder: string;
  cardNumber: string;
  cardExpiration: string;
  cardCVC: string;
  country: string;
  zip: string;
};

const plans = [
  {
    // Changed value and label here
    value: 'personal',
    label: 'Personal',
    details: 'Starter plan for individuals.',
    price: 9,
  },
  {
    value: 'team',
    label: 'Team',
    details: 'Collaborate up to 10 people.',
    price: 29,
  },
  {
    value: 'enterprise',
    label: 'Enterprise',
    details: 'For bigger businesses.',
    price: 99,
  },
];

// DUMMY DATA for Current Subscription
const DUMMY_SUBSCRIPTION = {
  currentPlan: 'team',
  renewalDate: '2026-03-01',
  monthlyCost: 29.00,
  status: 'Active',
};

const defaultValues: FormType = {
  plan: 'team', // Use 'team' as the default/current plan for the form state
  cardHolder: '',
  cardNumber: '',
  cardExpiration: '',
  cardCVC: '',
  country: '',
  zip: '',
};

/**
 * Form Validation Schema
 */
const schema = z.object({
  plan: z.enum(['personal', 'team', 'enterprise'], { errorMap: () => ({ message: 'Plan is required' }) }), // Changed 'basic' to 'personal' in schema
  cardHolder: z.string().nonempty('Card holder is required'),
  cardNumber: z
    .string()
    .nonempty('Card number is required')
    .regex(/^\d{16}$/, 'Card number must be 16 digits'),
  cardExpiration: z
    .string()
    .nonempty('Expiration date is required')
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiration date must be MM/YY'),
  cardCVC: z.string().nonempty('CVC is required').regex(/^\d{3,4}$/, 'CVC must be 3 or 4 digits'),
  country: z.string().nonempty('Country is required'),
  zip: z.string().nonempty('ZIP code is required'),
});

function PlanBillingTab() {
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false); // New state for cancellation
  const [dialogContent, setDialogContent] = useState<{ title: string; text: string; type: 'success' | 'error' }>({
    title: '',
    text: '',
    type: 'success',
  });

  const { control, reset, handleSubmit, formState, trigger } = useForm<FormType>({
    defaultValues,
    mode: 'all',
    resolver: zodResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  // Log form state for debugging
  console.log('Form State:', { isValid, dirtyFields, errors });

  const handleSubmitClick = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submit button clicked');
    const isValid = await trigger(); // Manually trigger validation
    console.log('Form validation result:', isValid);
    if (isValid) {
      handleSubmit(onSubmit)();
    } else {
      setMessage({ type: 'error', text: 'Form validation failed. Please check all fields.' });
    }
  };

  async function onSubmit(formData: FormType) {
    console.log('Form submission triggered with data:', formData);
    setIsLoading(true);
    setMessage(null);

    try {
      // Simulate API call to update plan/billing
      // NOTE: API URL and logic are mocked based on your existing code structure
      const payload = {
        Plan: formData.plan,
        CardHolder: formData.cardHolder,
        // ... other fields
      };
      console.log('Sending payload to API:', payload);

      // --- Mocking successful API response ---
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

      setDialogContent({
        title: 'Success',
        text: 'Plan and payment details saved successfully!',
        type: 'success',
      });
      setDialogOpen(true);
      reset(defaultValues);
    } catch (error: any) {
      console.error('Submission error:', error.message);
      setDialogContent({
        title: 'Error',
        text: 'Failed to save settings. Check the console for details.',
        type: 'error',
      });
      setDialogOpen(true);
    } finally {
      setIsLoading(false);
    }
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
    setMessage(dialogContent.type === 'success' ? { type: 'success', text: dialogContent.text } : { type: 'error', text: dialogContent.text });
  };
  
  // --- New Cancellation Handlers ---
  const handleCancelSubscription = () => {
    setCancelDialogOpen(true);
  };
  
  const confirmCancelSubscription = async () => {
    setCancelDialogOpen(false);
    setIsLoading(true);
    
    try {
      // Simulate API call to cancel subscription
      console.log('Sending cancellation request to API...');
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
      
      setDialogContent({
        title: 'Subscription Cancelled',
        text: `Your subscription to the ${DUMMY_SUBSCRIPTION.currentPlan.toUpperCase()} plan has been successfully cancelled. Access will remain until the renewal date of ${DUMMY_SUBSCRIPTION.renewalDate}.`,
        type: 'success',
      });
      setDialogOpen(true);
    } catch (error) {
      setDialogContent({
        title: 'Cancellation Failed',
        text: 'We couldn\'t process your cancellation. Please try again or contact support.',
        type: 'error',
      });
      setDialogOpen(true);
    } finally {
      setIsLoading(false);
    }
  };
  // --- End of New Cancellation Handlers ---

  return (
    <div className="w-full max-w-5xl">
      {message && (
        <Alert severity={message.type} className="mb-4">
          {message.text}
        </Alert>
      )}
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="w-full">
          <Typography className="text-xl">Change your plan</Typography>
          <Typography color="text.secondary">Upgrade or downgrade your current plan.</Typography>
        </div>
        <div className="mt-8 grid w-full gap-4 sm:grid-cols-3">
          <div className="sm:col-span-3">
            <Alert severity="info">
              Changing the plan will take effect immediately. You will be charged for the rest of the current month.
            </Alert>
          </div>
          <Controller
            name="plan"
            control={control}
            render={({ field }) => (
              <>
                {plans.map((plan) => (
                  <Paper
                    sx={(theme) => ({
                      '&.selected': {
                        border: `3px solid ${theme.palette.secondary.main}`,
                      },
                    })}
                    className={clsx(
                      'flex flex-1 cursor-pointer flex-col items-start justify-start rounded-md p-6 border-3 border-transparent relative',
                      field.value === plan.value ? 'selected' : ''
                    )}
                    onClick={() => field.onChange(plan.value)}
                    key={plan.value}
                  >
                    {field.value === plan.value && (
                      <CreateSvgIcon className="absolute right-0 top-0 mr-3 mt-3" size={24} color="secondary">
                        heroicons-solid:check-circle
                      </CreateSvgIcon>
                    )}
                    <Typography className="font-semibold uppercase">{plan.label}</Typography>
                    <Typography className="mt-1" color="text.secondary">
                      {plan.details}
                    </Typography>
                    <div className="flex-auto" />
                    <div className="flex items-end mt-2 text-lg">
                      <Typography>
                        {plan.price.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })}
                      </Typography>
                      <Typography color="text.secondary"> / month</Typography>
                    </div>
                  </Paper>
                ))}
                {errors.plan && (
                  <Typography color="error" className="mt-2">
                    {errors.plan.message}
                  </Typography>
                )}
              </>
            )}
          />
        </div>

        <div className="mb-10 mt-12 border-t" />
        <div className="w-full">
          <Typography className="text-xl">Payment Details</Typography>
          <Typography color="text.secondary">
            Update your billing information. Make sure to set your location correctly as it could affect your tax rates.
          </Typography>
        </div>
        <div className="mt-8 grid w-full grid-cols-4 gap-6">
          <div className="col-span-4">
            <Controller
              control={control}
              name="cardHolder"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Card holder"
                  placeholder="Card holder"
                  id="cardHolder"
                  error={!!errors.cardHolder}
                  helperText={errors?.cardHolder?.message}
                  variant="outlined"
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CreateSvgIcon size={20}>heroicons-solid:user-circle</CreateSvgIcon>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </div>
          <div className="col-span-4 sm:col-span-2">
            <Controller
              control={control}
              name="cardNumber"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Card number"
                  placeholder="Card number"
                  id="cardNumber"
                  error={!!errors.cardNumber}
                  helperText={errors?.cardNumber?.message}
                  variant="outlined"
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CreateSvgIcon size={20}>heroicons-solid:credit-card</CreateSvgIcon>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Controller
              control={control}
              name="cardExpiration"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Expiration date"
                  placeholder="MM/YY"
                  id="cardExpiration"
                  error={!!errors.cardExpiration}
                  helperText={errors?.cardExpiration?.message}
                  variant="outlined"
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CreateSvgIcon size={20}>heroicons-solid:credit-card</CreateSvgIcon>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Controller
              control={control}
              name="cardCVC"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="CVC / CVC2"
                  placeholder="CVC / CVC2"
                  id="cardCVC"
                  error={!!errors.cardCVC}
                  helperText={errors?.cardCVC?.message}
                  variant="outlined"
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CreateSvgIcon size={20}>heroicons-solid:lock-closed</CreateSvgIcon>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </div>
          <div className="col-span-4 sm:col-span-2">
            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Country"
                  placeholder="Country"
                  id="country"
                  error={!!errors.country}
                  helperText={errors?.country?.message}
                  variant="outlined"
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CreateSvgIcon size={20}>heroicons-solid:map</CreateSvgIcon>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </div>
          <div className="col-span-4 sm:col-span-2">
            <Controller
              control={control}
              name="zip"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="ZIP / Postal code"
                  placeholder="ZIP / Postal code"
                  id="zip"
                  error={!!errors.zip}
                  helperText={errors?.zip?.message}
                  variant="outlined"
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CreateSvgIcon size={20}>heroicons-solid:hashtag</CreateSvgIcon>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </div>
        </div>

        <Divider className="mb-10 mt-11 border-t" />
        <div className="flex items-center justify-end space-x-2">
          <Button variant="outlined" disabled={_.isEmpty(dirtyFields)} onClick={() => reset(defaultValues)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            disabled={_.isEmpty(dirtyFields) || !isValid || isLoading}
            onClick={handleSubmitClick}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </div>
      </form>

      {/* ------------------------------------------------------------------------- */}
      {/* CANCEL SUBSCRIPTION SECTION (Updated Styling for subtlety) */}
      {/* ------------------------------------------------------------------------- */}
      <Divider className="mb-10 mt-12 border-t" />
      <div className="w-full">
        <Typography className="text-xl">Subscription Status</Typography> {/* Changed title to be less "cancel-centric" */}
        <Typography color="text.secondary">
          View your current plan and manage your subscription.
        </Typography>
        
        <Paper 
          className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-lg border" 
          variant="outlined" 
        >
          <Box className="flex flex-col mb-4 sm:mb-0">
            <Typography variant="body1" className="font-semibold">
              Current Plan: {DUMMY_SUBSCRIPTION.currentPlan.toUpperCase()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Renewal Date: {DUMMY_SUBSCRIPTION.renewalDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Cost: ${DUMMY_SUBSCRIPTION.monthlyCost.toFixed(2)} / month
            </Typography>
          </Box>
          <Button
            variant="text" // Changed to text variant for a subtle appearance
            color="inherit" // Use inherit color to match surrounding text
            onClick={handleCancelSubscription}
            disabled={DUMMY_SUBSCRIPTION.status !== 'Active' || isLoading}
            className="w-full sm:w-auto"
          >
            {DUMMY_SUBSCRIPTION.status === 'Active' ? 'Cancel Subscription' : 'Subscription Already Cancelled'}
          </Button>
        </Paper>
      </div>

      {/* ------------------------------------------------------------------------- */}
      {/* GENERAL RESPONSE DIALOG (Existing) */}
      {/* ------------------------------------------------------------------------- */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{dialogContent.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogContent.text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* ------------------------------------------------------------------------- */}
      {/* CONFIRM CANCELLATION DIALOG (NEW) */}
      {/* ------------------------------------------------------------------------- */}
      <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)}>
        <DialogTitle>Confirm Cancellation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel your **{DUMMY_SUBSCRIPTION.currentPlan.toUpperCase()}** subscription? 
            Your access will continue until the renewal date of **{DUMMY_SUBSCRIPTION.renewalDate}**.
            This action cannot be undone immediately.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialogOpen(false)} color="inherit" disabled={isLoading}>
            Keep Subscription
          </Button>
          <Button onClick={confirmCancelSubscription} color="error" variant="contained" disabled={isLoading}> {/* Keep red for confirmation, it's a destructive action */}
            {isLoading ? <CircularProgress size={24} /> : 'Yes, Cancel'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PlanBillingTab;