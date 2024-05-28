'use client'

import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '@/lib/features/auth/auth.api'
import { AuthLoginDto } from '@/lib/features/auth/auth.types';

const defaultValues: AuthLoginDto = {
    name: '',
    email: '',
}

export default function Page() {
    const [login, loginStatus] = useLoginMutation()
    const { register, handleSubmit, formState } = useForm({ defaultValues });
    const { errors } = formState

    const onSubmit = async (data: AuthLoginDto) => {
        await login(data)
    }

    return (
        <Stack direction={'column'} justifyContent={'center'} sx={{ height: '100vh' }} spacing={2}>
            <Stack direction={'row'} justifyContent={'center'}>
                <Card variant='outlined' sx={{ width: '400px' }}>
                    <CardHeader title='Iniciar sesión' />

                    <CardContent>
                        <Stack direction={'column'} justifyContent={'center'} spacing={2}>
                            <TextField
                                label="Nombre"
                                {...register('name', {
                                    required: 'Debe ingresar un nombre',
                                })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />

                            <TextField
                                label="Email"
                                {...register('email', {
                                    required: 'Debe ingresar un email',
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "Debe ingresar un email válido",
                                    },
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Stack>
                    </CardContent>

                    <CardActions>
                        <Stack direction={'row'} justifyContent={'center'} sx={{ width: '100%' }}>
                            <Button
                                disabled={loginStatus.isLoading}
                                variant='contained'
                                color='primary'
                                onClick={handleSubmit(onSubmit)}
                            >
                                Iniciar sesión
                            </Button>
                        </Stack>
                    </CardActions>
                </Card>
            </Stack>
        </Stack>
    )
}