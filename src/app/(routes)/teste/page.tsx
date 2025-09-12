import { Listing } from "@global/request/builder/api/Listing";
import React, { useState, useEffect } from "react";

type Props = {};

export default async function page({ }: Props) {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6Im1haWxAbWFpbC5jb20iLCJleHAiOjE3NjAyMDI3Mjd9.Qs5DKIzFjbwUrcUwF_8ZJX8evFRBEmJVXTRWOKhj3Ik";

  const data = await fetch('https://sistemasclientes.com.br/projetos/api-medrqe/questoes2',
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  )

  const body = await data.json();
  // const posts = await data.json()

  // const listing = new Listing({
  //   entity: 'faturas',
  // });

  // const result = await listing.build(true);

  return (
    <div>{JSON.stringify(body)}</div>
  )
}
