import React from 'react';
import { Create, Edit, List, Datagrid, TextField, EmailField, SimpleForm, TextInput } from 'react-admin';
export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="username" />
            <EmailField source="email" />
            <TextField source="firstName" />
            <TextField source="lastName" />
            <TextField source="address" />
            <TextField source="city" />
            <TextField source="country" />
            <TextField source="phone" />
        </Datagrid>
    </List>
);

export const UserEdit = props => (
    <Edit {...props}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput source="username" />
        <TextInput source="email" />
        <TextInput source="name" />
        <TextInput source="firstName" />
        <TextInput source="lastName" />
        <TextInput source="address" />
        <TextInput source="city" />
        <TextInput source="country" />
        <TextInput source="phone" />

      </SimpleForm>
    </Edit>
  );

  export const UserCreate = props => (
    <Create {...props}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput source="username" />
        <TextInput source="email" />
        <TextInput source="name" />
        <TextInput source="firstName" />
        <TextInput source="lastName" />
        <TextInput source="address" />
        <TextInput source="city" />
        <TextInput source="country" />
        <TextInput source="phone" />
      </SimpleForm>
    </Create>
  );