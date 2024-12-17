import { Button, Form, Input, message } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import login from '../assets/login.svg';
import { Link } from 'react-router-dom';
import profile from '../assets/profile-image.jpg';
import GoogleButton from 'react-google-button';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css'

const Login = () => {
  const emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

  const loginWithGoogle = () => {
    window.open("https://musify-server-phi.vercel.app/auth/google/callback", "_self",)
  }

  const handleSubmit = async (values) => {
    const { email, password } = values;
    try {
      const response = await axios.post(`https://musify-server-phi.vercel.app/login`, {
        email,
        password
      }, {
        withCredentials: true
      });
      const userData = response.data;
      localStorage.setItem("userData", JSON.stringify(userData));
      message.info(`${userData.message}`)
      setTimeout(()=>{
        window.location.href = "/home";
      },1500)
    } catch (error) {
      console.error('login Error:', error);
      Swal.fire({
        title: "Error",
        text: "User Does not exist use different credentials",
        icon: "error",
        showConfirmButton: true,
        timer: 3000,
      })
    }
  }


  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="absolute top-5 md:top-0 lg:top-10 flex justify-center items-center space-x-4">
        <h1 className="font-semibold text-4xl md:text-7xl lg:text-8xl">Musify</h1>
        <img src={profile} alt="Profile" className="w-14 h-14 md:w-24 md:h-24 border-4 border-gray-500 bg-black rounded-full" />
      </div>
      <div className='flex justify-center items-center w-full h-[80%] gap-6'>
        <div className='hidden md:flex justify-center items-center w-[50%] ml-[-5rem]'>
          <img
            className="w-[80%] h-auto object-cover"
            src={login}
            alt="Login Illustration"
          />
        </div>
        <div className="flex justify-center items-center border border-gray-300 rounded-md w-[80%] md:w-[50%] lg:w-[25%] p-4 gap-4 bg-white shadow-lg">
          <div className='w-[90%]'>
            <h1 className='font-semibold text-lg md:text-2xl text-center'>Login</h1>
            <Form layout="vertical" className='mt-4' onFinish={handleSubmit}>
              <Form.Item
                label="Email"
                name={['email']}
                rules={[{ required: true, message: 'Please input your email!', type: 'email' },
                {
                  pattern: emailRegex,
                  message: 'Please enter a valid email address!',
                },
                {
                  validator: (_, value) =>
                    value && value.includes('.com')
                      ? Promise.resolve()
                      : Promise.reject(new Error('Email must include ".com"')),
                },
                ]}
              >
                <Input
                  prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Email"
                  className="border border-gray-300 rounded"

                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' },

                ]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Password"
                  allowClear
                  className="border border-gray-300 rounded"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                  Login
                </Button>
              </Form.Item>
              <span className='flex justify-center items-center mt-[-1rem]'> Or </span>
              <Form.Item >
                <GoogleButton onClick={loginWithGoogle} label='Login with Google' style={{ borderRadius: '4rem', width: '100%', overflow: 'hidden', border: '1px solid blue' }} />
              </Form.Item>
              <Form.Item className='flex justify-center items-center'>
                New here ?
                <Link to="/signup">
                  <span className='text-yellow-500'>{ } Signup</span>
                </Link>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;