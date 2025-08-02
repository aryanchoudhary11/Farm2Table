import farmer from "../../assets/farmer.jpg";
const FarmerCTA = () => {
  return (
    <section>
      <div>
        <div>
          <img src={farmer} alt="Farmer" />
        </div>
        <div>
          <h2>Are you a Local Farmer?</h2>
          <p>
            Join Farm2Table and grow your business directly with local
            customers.
          </p>
          <button>Become a Farmer Parter</button>
        </div>
      </div>
    </section>
  );
};
export default FarmerCTA;
