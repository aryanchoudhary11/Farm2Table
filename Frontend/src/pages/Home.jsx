import Banner from "../components/Home/Banner";
import FarmerCTA from "../components/Home/FarmerCTA";
import Why from "../components/Home/Why";
import Working from "../components/Home/Working";
import Newsletter from "../components/Home/Newletter";

const Home = () => {
  return (
    <div>
      <Banner />
      <Why />
      <Working />
      <FarmerCTA />
      <Newsletter />
    </div>
  );
};
export default Home;
