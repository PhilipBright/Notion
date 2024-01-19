'use client';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form';

import {z} from 'zod'

const SignUpFormSchema = z.object({
    email: z.string().describe('Email').email({message: 'Invalid Email'}),
    password: z.string().describe('Password').min(6, 'Password must be minimum 6 characters'),
    confirmPassword: z.string().describe('Confirm Password').min(6, 'Password must be minimum 6 characters')
}).refine((data)=> data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ['confirmPassword'],
})

const Signup = () => {
    // const router = useRouter();
    const searchParams = useSearchParams();
    const [submitError, setSubmitError] = useState('');
    const [confirmation, setConfirmation] = useState(false)
    const constExchangeError = useMemo(() => {
        if (!searchParams) {
          return '';
        }
        return searchParams.get('error_description')
    }, [searchParams]);

    const confirmationAndErrorStyles = useMemo(()=> clsx('bg-primary', {
        "bg-red-500/10":constExchangeError,
        'border-red-500/50': constExchangeError,
        'text-red-700': constExchangeError
    }), [])

    const form = useForm<z.infer<typeof SignUpFormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(SignUpFormSchema),
        defaultValues: {email: '', password: '', confirmPassword: ''},
    })

    const onSubmit = () => {
    }
    const signUpHandler = () => {}
  return (
    <Form {...form}>
    <form
    onChange={() => {
        if (submitError) setSubmitError('');
    }}
    onSubmit={form.handleSubmit(onSubmit)}
    className='w-full sm:justify-center sm-w-[400px] space-y-6 flex flex-col'
    ></form>
    </Form>
  )
}

export default Signup