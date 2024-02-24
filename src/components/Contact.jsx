import emailjs from '@emailjs/browser'
import React, { Suspense, useRef, useState } from 'react'
import Fox from '../models/Fox'
import { Canvas } from '@react-three/fiber'

import Loader from './Loader'
import useAlert from '../hook/useAlert'
import Alert from './Alert'
export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  })
const {alert,showAlert,hideAlert}=useAlert()
  const [currentAnimation, setCurrentAnimation] = useState("idle")
  const formRef = useRef(null)

  const [isLoading, setIsLoading] = useState(false)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleFocus = () => {
    setCurrentAnimation("walk")
  }
  const handleBlur = () => {
    setCurrentAnimation("idle")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setCurrentAnimation("hit")

    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        to_name: "Abhishek Razora",
        from_email: form.email,
        to_email: 'abhishekrajora786@gmail.com',
        message: form.message
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setIsLoading(false)

      showAlert({show:true,text:'Message sent successfully!',type:"success"})
      setTimeout(() => {
        setForm({ name: "", email: "", message: "" })
        setCurrentAnimation("idle")
        hideAlert()
      }, 3000)
    }).catch((error) => {
      setIsLoading(false)
      setCurrentAnimation('idle')
      showAlert({show:true,text:error,type:"danger"})

      console.log(error)
    })
  }

  return (
    <section className='relative flex lg:flex-row flex-col max-container'>
{alert.show&& <Alert {...alert}/>}
 {/* <Alert text={"hello"} /> */}

      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h1 className='head-text'>Get in Touch</h1>

        <form action="" className='w-full flex flex-col gap-7 mt-14' onSubmit={handleSubmit}>
          <label htmlFor="" className='text-black-500 font-semibold'>Name
            <input type="text" name='name' placeholder='Abhishek Razora' required value={form.name} onChange={handleChange} className='input' onFocus={handleFocus} onBlur={handleBlur} />
          </label>
          <label htmlFor="" className='text-black-500 font-semibold'>Email
            <input type="email" name='email' placeholder='xyz@.com' required value={form.email} onChange={handleChange} className='input' onFocus={handleFocus} onBlur={handleBlur} />
          </label>
          <label htmlFor="" className='text-black-500 font-semibold'>Your Message
            <textarea rows={4} name='message' placeholder='Let me know how I can help you!' required value={form.message} onChange={handleChange} className='textarea' onFocus={handleFocus} onBlur={handleBlur} />
          </label>
          <button className='btn' onFocus={handleFocus} onBlur={handleBlur} disabled={isLoading}>{isLoading ? "Sending..." : "Send Message"}</button>
        </form>

      </div>

      <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'>
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000
          }}>
          <directionalLight intensity={2.5} position={[0, 0, 1]} />
          <ambientLight intensity={0.5} />
          <Suspense fallback={<Loader />}>
            <Fox
              position={[0.5, 0.35, 0]}
              rotation={[12.6, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
              currentAnimation={currentAnimation}
            />
          </Suspense>

        </Canvas>
      </div>
    </section>
  )
}
