import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { Header } from '../molecules/Header.jsx';
import Fincas from './Fincass.jsx';
import Lotes from './Lotes.jsx';

export const Cultivos = () => {

  return(
    <div className='bg-[#EAEDF6] h-screen max-h-max'>
    <Header title="Datos cultivos caficultor" />
      <div className='bg-[#EAEDF6]'>
        <div className='w-full max-w-[90%] ml-28 items-center p-10 flex-auto'>

          <div className="flex flex-col px-10 gap-x-4 pt-8 w-full bg-[#EAEDF6]">
            <Tabs aria-label="Options" variant="bordered" >
              <Tab key="departamentos" title="Fincas">
                <Card className=" ">
                  <CardBody>
                    <Fincas />
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="municipios" title="Lotes">
                <Card className=" ">
                  <CardBody>
                    <Lotes />
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>
          </div>
        </div>

      </div>
</div>
  )
};
