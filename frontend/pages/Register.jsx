import React from 'react'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center font-semibold my-7'>Register</h1>
    <form 
    // onSubmit={handleSubmit} 
    className='flex flex-col gap-4'>
      <input
        type='text'
        placeholder='username'
        className='border p-3 rounded-lg'
        id='username'
        // onChange={handleChange}
      />
      <input
        type='email'
        placeholder='email'
        className='border p-3 rounded-lg'
        id='email'
        // onChange={handleChange}
      />
      <input
        type='password'
        placeholder='password'
        className='border p-3 rounded-lg'
        id='password'
        // onChange={handleChange}
      />

      <button
        // disabled={loading}
        className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
      >
        {/* {loading ? 'Loading...' : 'Sign Up'} */} Register
      </button>
      {/* <OAuth/> */}
    </form>
    <div className='flex gap-2 mt-5'>
      <p>Have an account?</p>
      <Link to={'/login'}>
        <span className='text-blue-700'>Login</span>
      </Link>
    </div>
    {/* {error && <p className='text-red-500 mt-5'>{error}</p>} */}
  </div>
  )
}

export default Register
