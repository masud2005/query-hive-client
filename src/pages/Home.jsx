import React from 'react';
import RecentQueries from '../components/RecentQueries';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Slider from '../components/Slider';

const Home = () => {
    return (
        <div>
            <Slider />
            <RecentQueries />
            <FAQ />
            <Testimonials />
        </div>
    );
};

export default Home;