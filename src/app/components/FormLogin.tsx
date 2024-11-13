'use client'
import { Button, Checkbox, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { redirect } from 'next/navigation'

export default function FormLogin() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    //   password: (value) => (/[0-9]/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <form  onSubmit={form.onSubmit((values) => 
        redirect(`/admin`)
    )}>
      <TextInput
        withAsterisk
        label="Email"
        placeholder="your@email.com"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
      <TextInput
        withAsterisk
        label="password"
        placeholder="password"
        key={form.key('password')}
        {...form.getInputProps('password')}
      />

    

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}