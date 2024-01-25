import React from "react";
import { Link } from 'react-router-dom';


export default function Content() {
    return (
        <div className="container mx-auto px-4">
            {/* Header Section */}
            <div className="text-center py-16">
                <h1 className="text-4xl font-bold mb-4">Discover the Best with Our Ratings!</h1>

                {/* <p className="text-xl mb-10">Rate, Review, and Explore top-rated products, services, and experiences.</p> */}
                <p className="text-xl md:text-2xl leading-relaxed font-light tracking-normal text-gray-600 mx-auto my-10 px-4 lg:px-0 max-w-3xl">
                  Rate, Review, and Explore top-rated products, services, and experiences.
                </p>

                <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded">
                  <Link to={'/board'}>Start Rating</Link>
                </button>
                {/* <button className="bg-transparent hover:bg-cyan-500 text-cyan-700 font-semibold hover:text-white py-2 px-4 border border-cyan-500 hover:border-transparent rounded ml-2">
                  Learn More
                </button> */}
            </div>

            {/* Features*/}
            <div className="grid md:grid-cols-3 gap-8 text-center py-8">
                <div className="p-4 flex flex-col items-center">
                    <div className="mb-4">
                        {/* Insert your SVG icon here */}
                        <svg dataSlot="icon" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100" height="100">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                    </div>
                    <h2 className="font-bold mb-2">Comprehensive Reviews</h2>
                    <p>Deep insights into products and services.</p>
                </div>
                <div className="p-4 flex flex-col items-center">
                    <div className="mb-4">
                    <svg dataSlot="icon" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100" height="100">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                    </svg>
                    </div>
                    <h2 className="font-bold mb-2">User-Generated Scores</h2>
                    <p>Authentic ratings provided by our user community.</p>
                </div>
                <div className="p-4 flex flex-col items-center">
                    <div className="mb-4">
                        <svg dataSlot="icon" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100" height="100">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>
                    </div>
                    <h2 className="font-bold mb-2">Community Driven</h2>
                    <p>Join a growing community of passionate reviewers.</p>
                </div>
            </div>

        </div>
    );
}
