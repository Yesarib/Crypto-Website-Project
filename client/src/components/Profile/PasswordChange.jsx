import React from 'react'
import { Button } from '@mui/material'

const PasswordChange = () => {
  return (
    <div className='user-info'>
        <p style={{fontSize:'16px'}}> Şifre değiştir </p>
        <p style={{fontSize:'14px'}}> Şifrenizi 15 günde bir değiştirebileceğinizi unutmayın! </p>

        <div className='all-info'>
            <div className='profile-user'>
                <label> Eski Şifre </label>
                <input style={{marginTop:'5px'}} type="password" name="name" id="user-name" placeholder='Eski Şifre'/>
            </div>
            <div className='profile-user'>
                <label> Yeni Şifre </label>
                <input style={{marginTop:'5px'}} type="password" name="name" id="user-name" placeholder='Yeni Şifre'/>

            </div>
            <div className='profile-user'>
                <label> Yeni Şifre Tekrar </label>
                <input style={{marginTop:'5px'}} type="password" name="name" id="user-name" placeholder='Yeni Şifre Tekrar'/>

            </div>
            <Button className='save-btn'> Kaydet </Button>
        </div>
    </div>
  )
}

export default PasswordChange