import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/footer.module.css';
import React, { useState, useEffect } from 'react';

export const Footer = (props: { name: string }) => {
  return (
    <>
      <div className={` ${styles.center}`}>
        © らくらくヌードル 公式通販サイト All rights reserved.
      </div>
    </>
  );
};
