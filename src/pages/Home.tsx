import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import FeaturedProject from "@/components/FeaturedProject";
import BlogsPreview from "@/components/BlogsPreview";

const Home = () => {
    return (
        <div className="space-y-12">
            <Hero />
            <FeaturedProject />
            <Experience />
            <BlogsPreview />
        </div>
    );
};

export default Home;
