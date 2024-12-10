import { Button, Form, Input } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import signup from '../assets/signup.svg';
import { Link } from 'react-router-dom';
import profile from '../assets/profile-image.jpg';
import GoogleButton from 'react-google-button';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css'



const Signup = () => {
  const signupWithGoogle = () => {
    window.open("https://musify-server-three.vercel.app/auth/google/callback", "_self")
  }
  const emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

  const handleSubmit = async (values) => {
    const { email, password, name } = values;
    try {
      const signup = await axios.post(`https://musify-server-three.vercel.app/signup`, {
        name,
        email,
        password
      }, {
        withCredentials: true
      })
      window.location.href = "/home";
    } catch (error) {
      console.error('Signup Error:', error);
      if (error.response && error.response.status === 409) {
        // Extract custom error message from the response
        const errorMessage = error.response.data.message || "User already exists!";
        Swal.fire({
          title: "Error",
          text: errorMessage,
          icon: "error",
          showConfirmButton: true,
          timer: 3000,
        })
      } else {
        // Handle other errors
        Swal.fire({
          title: "Error",
          text: "Something went wrong. Please try again later.",
          icon: "error",
          showConfirmButton: true,
        });
      }
    }
  }
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="absolute top-0 md:top-0 lg:top-0 flex justify-center items-center space-x-4">
        <h1 className="font-semibold text-4xl md:text-5xl lg:text-8xl">Musify</h1>
        <img src={profile} alt="Profile" className="w-14 h-14 md:w-15 md:h-15 lg:w-24 lg:h-24 border-4 border-gray-500 bg-black rounded-full" />
      </div>
      <div className='flex justify-center items-center w-full h-[80%] gap-6'>
        <div className='hidden md:flex justify-center items-center w-[50%] ml-[-5rem]'>
          <img
            className="w-[80%] h-auto object-cover"
            src={signup}
            alt="Login Illustration"
          />
        </div>
        <div className="flex justify-center items-center border border-gray-300 rounded-md w-[80%] md:w-[50%] lg:w-[25%] p-4 gap-4 bg-white shadow-lg">
          <div className='w-[90%]'>
            <h1 className='font-semibold text-lg md:text-2xl text-center'>Signup</h1>
            <Form layout="vertical" className='mt-4' onFinish={handleSubmit}>
              <Form.Item
                label="UserName"
                name="name"
                rules={[
                  { required: true, message: 'please Input your UserName' }
                ]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="UserName"
                  className="border border-gray-300 rounded"
                />
              </Form.Item>
              <Form.Item
                label="Email"
                name={['email']}
                rules={[{ required: true, message: 'Please input your email!', type: 'email' },
                {
                  pattern: emailRegex,
                  message: 'Please enter a valid email address!',
                },
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.resolve();
                    }
                    return value.includes('.com')
                      ? Promise.resolve()
                      : Promise.reject(new Error('Email must include .com'));
                  },
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
                rules={[{ required: true, message: 'Please input your password!', type: 'password' },
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.resolve();
                    }
                    if (!/[A-Z]/.test(value)) {
                      return Promise.reject(new Error('Password must include at least one uppercase letter!'));
                    }
                    if (!/[@#]/.test(value)) {
                      return Promise.reject(new Error('Password must include at least one @ or #!'));
                    }
                    if (!/^.{8,14}$/.test(value)) {
                      return Promise.reject(new Error('Password must be 8-14 characters long!'));
                    }
                    if (!/[0-9]/.test(value)) {
                      return Promise.reject(new Error('Password must include at least one number!'));
                    }
                    return Promise.resolve();
                  },
                }
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
                  Signup
                </Button>
              </Form.Item>
              <span className='flex justify-center items-center mt-[-1rem]'> Or </span>
              <Form.Item >
                <GoogleButton onClick={signupWithGoogle} label='Signup with Google' className='text-xs md:text-[2px]' style={{ borderRadius: '4rem', width: '100%', overflow: 'hidden', border: '1px solid blue' }} />
              </Form.Item>
              <Form.Item className='flex justify-center items-center'>
                Already Have Account ?
                <Link to="/">
                  <span className='text-yellow-500'>{ } Login</span>
                </Link>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
