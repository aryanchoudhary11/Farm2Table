import Banner from "../components/Home/Banner";
import FarmerCTA from "../components/Home/FarmerCTA";
import Why from "../components/Home/Why";
import Working from "../components/Home/Working";
import Newsletter from "../components/Home/Newletter";
import Footer from "../components/Home/Footer";

const Home = () => {
  return (
    <div>
      <Banner />
      <Why />
      <Working />
      <FarmerCTA />
      <Newsletter />
      <Footer />
    </div>
  );
};
export default Home;
