import React from 'react';
import { NextPage } from 'next';
import { footerList1, footerList2, footerList3 } from '../utils/constants';
import Link from 'next/link';

const List = ({ items,mt } : {items:string[], mt:boolean})=>{ // in tsx we have to specify which type props is
  return (
    <div className= {`flex flex-wrap ${mt && 'mt-5'} gap-2 mt-5`}>
        {items.map((item)=>(
          <Link key={item} href={`/${item}`}>
          <p key={item} className='text-gray-400 text-sm hover:underline cursor-pointer'>
            {item}
          </p>
          </Link>
        ))}
      </div>
  )
}

//nothing magic
const Footer = () => {
  return (
    <div className='mt-6 hidden xl:block'>
      <List items={footerList1} mt={false}/>
      <List items={footerList2} mt/>
      <List items={footerList3} mt/>
      <p className='text-gray-400 text-sm mt-5'>2022 Priyansh Sharma</p>

    </div>
  )
}

export default Footer