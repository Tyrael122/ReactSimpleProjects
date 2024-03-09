export default function HeroSection() {
    return (
      <div className="bg-[#F2F0F1]">
        <div className="flex w-full flex-row justify-between">
          <div className="flex flex-col mt-20 ml-20">
            <b className="text-6xl mb-5">FIND CLOTHES <br /> THAT MATCH <br /> YOUR STYLE</b>
  
            <p>
              Browse through our diverse range of meticulously crafted garments,
              designed <br /> to bring out your individuality and cater to your
              sense of style.
            </p>
  
            <div className="flex flex-row mt-40 gap-x-10">
              <InfoColumn number="200+" text="International Brands" />
              <InfoColumn number="2,000+" text="High-Quality Products" />
              <InfoColumn number="30,000+" text="Happy Customers" />
            </div>
          </div>
  
          <img src="./assets/heroImage.png" width="600" height="100" />
        </div>
      </div>
    );
  }
  
  function InfoColumn({ number, text }) {
    return (
      <div className="flex flex-col">
        <b className="text-4xl"> {number} </b>
        <p> {text} </p>
      </div>
    );
  }