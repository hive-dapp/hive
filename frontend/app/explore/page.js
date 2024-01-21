"use client"
import Cookies from "js-cookie";
import axios from "axios";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { removePrefix } from "../../modules/Utils/ipfsUtil";
import { NFTStorage } from "nft.storage";
import Image from 'next/image';
import Header from '../../components/header';

const Explore = () => {
 
  return (
    <div 
    >
      <Header />
<div className="max-w-6xl mx-auto mt-10 grid grid-cols-3 gap-2">

      <div className="border p-4 rounded-lg">
        <img src="/bg.avif"/>
<div className="mt-2">Name: </div>
<div>Reputation Score: </div>
      </div>

      <div className="border p-4 rounded-lg">
      <img src="/bg2.jpeg"/>
      <div className="mt-2">Name: </div>
<div>Reputation Score: </div>
      </div>

      <div className="border p-4 rounded-lg">
      <img src="/bg4.avif"/>
      <div className="mt-2">Name: </div>
<div>Reputation Score: </div>
      </div>

      <div className="border p-4 rounded-lg">
      <img src="/bg5.png"/>
      <div className="mt-2">Name: </div>
<div>Reputation Score: </div>
      </div>

      <div className="border p-4 rounded-lg">
      <img src="/bg6.jpeg"/>
      <div className="mt-2">Name: </div>
<div>Reputation Score: </div>
      </div>

      </div>
     </div> 
  );
};

export default Explore;
