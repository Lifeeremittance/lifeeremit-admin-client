const Currencies = ({ currencies, setShow, setShow2 }: any) => {
  return (
    <>
      <div className="grid-4">
        {currencies.length > 0
          ? currencies.map(
              (
                currency: { currencyImage: string | undefined },
                index: React.Key | null | undefined
              ) => (
                <div className="currency_card" key={index}>
                  <img
                    src={currency.currencyImage}
                    className="w-100"
                    alt="money"
                    height="150px"
                    style={{ borderRadius: "16.35px" }}
                  />
                </div>
              )
            )
          : null}
      </div>
      <div className="d-flex align-items-center justify-content-between mt-5">
        <div className="d-flex align-items-center mt-4">
          <div
            className="d-grid me-3 cursor-pointer"
            style={{
              width: 40,
              height: 40,
              background: "#263238",
              borderRadius: "10px",
              placeContent: "center",
            }}
            onClick={() => setShow(true)}
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.6875 9.1875H11.8125V1.3125C11.8125 0.964403 11.6742 0.630564 11.4281 0.384423C11.1819 0.138281 10.8481 0 10.5 0C10.1519 0 9.81806 0.138281 9.57192 0.384423C9.32578 0.630564 9.1875 0.964403 9.1875 1.3125V9.1875H1.3125C0.964403 9.1875 0.630564 9.32578 0.384423 9.57192C0.138281 9.81806 0 10.1519 0 10.5C0 10.8481 0.138281 11.1819 0.384423 11.4281C0.630564 11.6742 0.964403 11.8125 1.3125 11.8125H9.1875V19.6875C9.1875 20.0356 9.32578 20.3694 9.57192 20.6156C9.81806 20.8617 10.1519 21 10.5 21C10.8481 21 11.1819 20.8617 11.4281 20.6156C11.6742 20.3694 11.8125 20.0356 11.8125 19.6875V11.8125H19.6875C20.0356 11.8125 20.3694 11.6742 20.6156 11.4281C20.8617 11.1819 21 10.8481 21 10.5C21 10.1519 20.8617 9.81806 20.6156 9.57192C20.3694 9.32578 20.0356 9.1875 19.6875 9.1875Z"
                fill="white"
              />
            </svg>
          </div>
          Add Currency
        </div>

        <div className="d-flex align-items-center mt-4">
          <div
            className="d-grid me-3 cursor-pointer"
            style={{
              width: 40,
              height: 40,
              background: "#263238",
              borderRadius: "10px",
              placeContent: "center",
            }}
            onClick={() => setShow2(true)}
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.6875 9.1875H11.8125V1.3125C11.8125 0.964403 11.6742 0.630564 11.4281 0.384423C11.1819 0.138281 10.8481 0 10.5 0C10.1519 0 9.81806 0.138281 9.57192 0.384423C9.32578 0.630564 9.1875 0.964403 9.1875 1.3125V9.1875H1.3125C0.964403 9.1875 0.630564 9.32578 0.384423 9.57192C0.138281 9.81806 0 10.1519 0 10.5C0 10.8481 0.138281 11.1819 0.384423 11.4281C0.630564 11.6742 0.964403 11.8125 1.3125 11.8125H9.1875V19.6875C9.1875 20.0356 9.32578 20.3694 9.57192 20.6156C9.81806 20.8617 10.1519 21 10.5 21C10.8481 21 11.1819 20.8617 11.4281 20.6156C11.6742 20.3694 11.8125 20.0356 11.8125 19.6875V11.8125H19.6875C20.0356 11.8125 20.3694 11.6742 20.6156 11.4281C20.8617 11.1819 21 10.8481 21 10.5C21 10.1519 20.8617 9.81806 20.6156 9.57192C20.3694 9.32578 20.0356 9.1875 19.6875 9.1875Z"
                fill="white"
              />
            </svg>
          </div>
          Add Country
        </div>
      </div>
    </>
  );
};

export default Currencies;
