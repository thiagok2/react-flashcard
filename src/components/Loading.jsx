import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";

export default function Loading() {
  return (
    <ClipLoader
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  )
}
