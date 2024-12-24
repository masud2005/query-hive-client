import React from 'react';
import RecentQueries from '../components/RecentQueries';
import PopularQueries from '../components/PopularQueries';
import Testimonials from '../components/Testimonials';

const Home = () => {
    return (
        <div>
            <RecentQueries />
            <PopularQueries />
            <Testimonials />
        </div>
    );
};

export default Home;