import React from "react";
import ToggleButton from "./ToggleButton.js";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container">
          <Link class="navbar-brand" to="/">
            MarketVision
          </Link>

          <div>
            <ul class="navbar-nav ml-auto">
              <li
                class={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/">
                  Home
                  <span class="sr-only">(current)</span>
                </Link>
              </li>

              <li
                class={`nav-item  ${
                  props.location.pathname === "/StockScreener" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/StockScreener">
                  Stock Screener
                </Link>
              </li>

              <li
                class={`nav-item  ${
                  props.location.pathname === "/Intrinsic" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/Intrinsic">
                  Intrinsic
                </Link>
              </li>

              <li
                class={`nav-item  ${
                  props.location.pathname === "/News" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/News">
                  News
                </Link>
              </li>

              <li
                class={`nav-item  ${
                  props.location.pathname === "/Crypto" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/Crypto">
                  Crypto
                </Link>
              </li>

              <li
                class={`nav-item  ${
                  props.location.pathname === "/NFT" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/NFT">
                  NFT
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <ToggleButton />
      </nav>
    </div>
  );
}

export default withRouter(Navigation);