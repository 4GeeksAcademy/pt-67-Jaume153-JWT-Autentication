import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";

import SingleCharacter from "./views/singleCharacter";
import SinglePlanet from "./views/singlePlanet";
import SingleVehicle from "./views/singleVehicle";
import injectContext from "./store/appContext";

import { MainNavbar } from "./component/navbar";
import { Footer } from "./component/footer";


//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
				<MainNavbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/people/:theid" element={<SingleCharacter/>} />
						<Route path="/planets/:theid" element={<SinglePlanet/>} />
						<Route path="/vehicles/:theid" element={<SingleVehicle />} />
					</Routes>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
