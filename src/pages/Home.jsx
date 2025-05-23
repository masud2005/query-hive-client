import React from 'react';
import RecentQueries from '../components/RecentQueries';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Slider from '../components/Slider';
import { Helmet } from 'react-helmet-async';
import QueryCategories from '../components/QueryCategories';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | Query Hive</title>
            </Helmet>
            <Slider />
            <RecentQueries />
            <QueryCategories />
            <Testimonials />
            <FAQ />
        </div>
    );
};

export default Home;