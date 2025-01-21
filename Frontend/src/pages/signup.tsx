import { useRef } from "react";
import { Button } from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link, Element } from "react-scroll";

export function Signup() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function handleSignup() {
        const username = emailRef.current?.value;
        const password = passwordRef.current?.value;
        if (!username || !password) {
            alert("Username and password are required");
            return;
        }
        try {
            const response = await axios.post("http://localhost:3000/api/v1/signup", { username, password });
            if (response.data.message === "user created") {
                navigate("/signin");
            }
        } catch (error: any) {
            if (error.response && (error.response.status === 411 || error.response.status === 409)) {
                alert(error.response.data.message);
            } else {
                alert("An unexpected error occurred. Please try again.");
            }
        }
    }

    return (
        <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-blue-300 to-purple-400">
            <header className="w-full p-4 bg-white shadow-md flex justify-between items-center">
                <h1 className="text-2xl font-bold text-purple-700">Brainly</h1>
                <nav className="flex gap-4">
                    <Link to="features" smooth duration={500} className="text-gray-600 hover:text-purple-600 cursor-pointer">Features</Link>
                    <Link to="about" smooth duration={500} className="text-gray-600 hover:text-purple-600 cursor-pointer">About</Link>
                </nav>
            </header>

            <main className="flex flex-col flex-grow">
                {/* Welcome Section */}
                <section className="h-[80vh] flex items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-300 to-purple-400">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-5xl font-bold text-center text-gray-800 mb-4">Welcome to Brainly</h2>
                        <p className="text-xl text-center text-gray-600 mb-8">Your second brain for organizing thoughts and boosting productivity. Whether you're saving videos, articles, or ideas, Brainly helps you capture what matters most. With our intuitive platform, managing your content has never been easier or more secure.</p>
                    </div>
                </section>

                {/* Features Section */}
                <section className="h-[80vh] flex items-center justify-center bg-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <Element name="features" className="mb-12">
                            <h3 className="text-4xl font-bold text-gray-800 mb-4">Features</h3>
                            <p className="text-lg text-gray-600 mb-4">Signup/Signin: Create a secure account or log in to access your personalized space.</p>
                            <p className="text-lg text-gray-600 mb-4">Save Links: Add YouTube and X links effortlessly to watch or revisit later.</p>
                            <p className="text-lg text-gray-600 mb-4">Embedded View: Watch saved videos and view X posts directly within the app.</p>
                            <p className="text-lg text-gray-600 mb-4">Your Organized Brain: Keep all your favorite content in one place, always accessible.</p>

                            <h4 className="text-2xl font-bold text-gray-800 mt-6">Security:</h4>
                            <p className="text-lg text-gray-600 mb-4">Password Hashing: Your passwords are securely hashed to ensure the highest level of protection.</p>
                            <p className="text-lg text-gray-600 mb-4">JWT Tokens: Robust authentication using JWT tokens ensures secure and seamless access to your data.</p>
                        </Element>
                    </div>
                </section>

                {/* About Section */}
                <section className="h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-300 to-purple-400 py-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <Element name="about" className="mb-12">
                            <h3 className="text-4xl font-bold text-gray-800 mb-4">About Us</h3>
                            <p className="text-lg text-gray-600 mb-4">
                                Welcome to Second Brain, your personalized space for organizing and revisiting the content that matters most to you. We believe in the power of simplicity and accessibility, which is why we’ve designed a platform where you can securely save, manage, and watch YouTube videos and X posts whenever you want.
                            </p>
                            <p className="text-lg text-gray-600 mb-4">
                                Our mission is to help you declutter your digital life by providing a reliable and user-friendly tool that acts as an extension of your memory. With a focus on security and performance, we use industry-standard technologies like hashed passwords and JWT authentication to ensure your data remains safe and accessible only to you.
                            </p>
                            <p className="text-lg text-gray-600 mb-4">
                                Whether you’re curating a list of tutorials, saving your favorite posts, or simply collecting ideas, Second Brain is here to help you stay organized, inspired, and productive.
                            </p>
                        </Element>
                    </div>
                </section>

                {/* SignUp Form Section */}
                <section className="h-[80vh] flex items-center justify-center bg-white py-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-xl text-gray-600 mb-4">Demo Credentials:</h3>
                        <p className="text-sm text-gray-600 mb-4">Username: akash12@gmail.com</p>
                        <p className="text-sm text-gray-600 mb-4">Password: Akash@123</p>

                        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-300 flex flex-col gap-4 w-80 mx-auto">
                            <input className="border-2 border-gray-300 rounded p-2" type="text" placeholder="Email..." ref={emailRef} />
                            <input className="border-2 border-gray-300 rounded p-2" type="password" placeholder="Password" ref={passwordRef} />
                            <Button variant="primary" text="Sign Up" size="md" onClick={handleSignup} />
                            <p onClick={()=>{navigate('/signin')}}>already have account?</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="w-full p-4 bg-gray-100 text-center text-gray-600">
                <p>&copy; 2025 Brainly. All rights reserved.</p>
            </footer>
        </div>
    );
}
