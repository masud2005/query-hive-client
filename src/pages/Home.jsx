import React from 'react';
import RecentQueries from '../components/RecentQueries';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';

const Home = () => {
    return (
        <div>
            <RecentQueries />
            <FAQ />
            <Testimonials />
        </div>
    );
};

export default Home;