export default function TopBar() {
    return (
        <div className="horizontal-margin-100px vertical-margin-20px">
            <div className="row space-between">
                <div className="row mainaxis-gapped-40px">
                <Logo />

                <ComboBox text="Shop" />

                <TopBarOption text="On Sale" />
                <TopBarOption text="New Arrivals" />

                <TopBarOption text="Brands" />
                </div>

                <SearchBar />

                <div className="row mainaxis-gapped-15px center-cross-axis">
                <Icon icon="shopping_cart" />
                <Icon icon="account_circle" />
                </div>
            </div>
        </div>
    );
  }
  
  function Logo() {
    return <b className="font-size-xx-large">SHOP.CO</b>;
  }
  
  function ComboBox({ text }) {
    return (
      <div className="row center-cross-axis">
        { text }
        <Icon icon="arrow_drop_down" />
      </div>
    ) 
  }
  
  function TopBarOption({ text }) {
    return <span className="no-wrap row center-cross-axis">{text}</span>;
  }
  
  function SearchBar() {
    return (
      <div className="row center-cross-axis width-100pc horizontal-margin-45px background-grayish left-padding rounded-border-10">
        <Icon icon="search"/>
        <input className="no-border width-90pc left-margin-5px background-grayish" type="text" placeholder="Search for products..." />
      </div>
    )
  }
  
  function Icon({ icon }) {
    return <i className="material-symbols-outlined">{ icon }</i>
  }