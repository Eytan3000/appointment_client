import * as React from 'react';
import Table from '@mui/joy/Table';
import BackArrow from '../../../utilsComponents/BackArrow';

const clients = [
  {
    name: 'Cohen Lital',
    phone: '050-854-7733',
    email: 'LitalCohen@gmail.com',
  },
  {
    name: 'Hogo Boss',
    phone: '059-333-2233',
    email: 'hugo@gmail.com',
  },
  {
    name: 'Cohen Lital',
    phone: '050-854-7733',
    email: 'LitalCohen@gmail.com',
  },
  {
    name: 'Hogo Boss',
    phone: '059-333-2233',
    email: 'hugo@gmail.com',
  },
  {
    name: 'Cohen Lital',
    phone: '050-854-7733',
    email: 'LitalCohen@gmail.com',
  },
  {
    name: 'Hogo Boss',
    phone: '059-333-2233',
    email: 'hugo@gmail.com',
  },
  {
    name: 'Cohen Lital',
    phone: '050-854-7733',
    email: 'LitalCohen@gmail.com',
  },
  {
    name: 'Hogo Boss',
    phone: '059-333-2233',
    email: 'hugo@gmail.com',
  },
  {
    name: 'Cohen Lital',
    phone: '050-854-7733',
    email: 'LitalCohen@gmail.com',
  },
  {
    name: 'Hogo Boss',
    phone: '059-333-2233',
    email: 'hugo@gmail.com',
  },
  {
    name: 'Cohen Lital',
    phone: '050-854-7733',
    email: 'LitalCohen@gmail.com',
  },
  {
    name: 'Hogo Boss',
    phone: '059-333-2233',
    email: 'hugo@gmail.com',
  },
  {
    name: 'Cohen Lital',
    phone: '050-854-7733',
    email: 'LitalCohen@gmail.com',
  },
  {
    name: 'Hogo Boss',
    phone: '059-333-2233',
    email: 'hugo@gmail.com',
  },
  {
    name: 'Cohen Lital',
    phone: '050-854-7733',
    email: 'LitalCohen@gmail.com',
  },
  {
    name: 'Hogo Boss',
    phone: '059-333-2233',
    email: 'hugo@gmail.com',
  },
  {
    name: 'Cohen Lital',
    phone: '050-854-7733',
    email: 'LitalCohen@gmail.com',
  },
  {
    name: 'Hogo Boss',
    phone: '059-333-2233',
    email: 'hugo@gmail.com',
  },
  {
    name: 'Cohen Lital',
    phone: '050-854-7733',
    email: 'LitalCohen@gmail.com',
  },
  {
    name: 'Hogo Boss',
    phone: '059-333-2233',
    email: 'hugo@gmail.com',
  },
  {
    name: 'Cohen Lital',
    phone: '050-854-7733',
    email: 'LitalCohen@gmail.com',
  },
  {
    name: 'Hogo Boss',
    phone: '059-333-2233',
    email: 'hugo@gmail.com',
  },
  {
    name: 'Cohen Lital',
    phone: '050-854-7733',
    email: 'LitalCohen@gmail.com',
  },
  {
    name: 'Hogo Boss',
    phone: '059-333-2233',
    email: 'hugo@gmail.com',
  },
  {
    name: 'Cohen Lital',
    phone: '050-854-7733',
    email: 'LitalCohen@gmail.com',
  },
  {
    name: 'Hogo Boss',
    phone: '059-333-2233',
    email: 'hugo@gmail.com',
  },
  {
    name: 'Cohen Lital',
    phone: '050-854-7733',
    email: 'LitalCohen@gmail.com',
  },
  {
    name: 'Hogo Boss',
    phone: '059-333-2233',
    email: 'hugo@gmail.com',
  },
  {
    name: 'Cohen Lital',
    phone: '050-854-7733',
    email: 'LitalCohen@gmail.com',
  },
  {
    name: 'Hogo Boss',
    phone: '059-333-2233',
    email: 'hugo@gmail.com',
  },
  {
    name: 'Cohen Lital',
    phone: '050-854-7733',
    email: 'LitalCohen@gmail.com',
  },
  {
    name: 'Hogo Boss',
    phone: '059-333-2233',
    email: 'hugo@gmail.com',
  },
  {
    name: 'Cohen Lital',
    phone: '050-854-7733',
    email: 'LitalCohen@gmail.com',
  },
  {
    name: 'Hogo Boss',
    phone: '059-333-2233',
    email: 'hugo@gmail.com',
  },
];
export default function ClientsTable() {
  return (
    <>
      <BackArrow />

      <Table aria-label="basic table" style={{ marginTop: '-2rem' }}>
        <thead>
          <tr>
            <th
            //   style={{ width: '40%' }}
            >
              Name
            </th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr>
              <td>{client.name}</td>
              <td>{client.phone}</td>
              <td>{client.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
