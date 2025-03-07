import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { AI_PROMPT, SelectBudgetList, SelectTravelList } from "@/constants/options";
import { chatSession } from "@/service/AIModal";
import { db } from "@/service/firebaseConfig";
import {
  faArrowLeft,
  faArrowRight,
  faCalendarAlt,
  faCheckCircle,
  faCrown,
  faDollarSign,
  faGem,
  faHeart,
  faMapMarkerAlt,
  faMoneyBillWave,
  faPlane,
  faSuitcase,
  faUserFriends,
  faUsers,
  faUsersCog
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGoogleLogin } from "@react-oauth/google";
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import destinations from "./destination.json";


const CreateTrip = () => {
  const [place, setPlace] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const query = e.target.value;
    setPlace(query);
    if (query.length > 0) {
      setFilteredDestinations(
        destinations.filter((destination) =>
          destination.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredDestinations([]);
    }
  };

  const handleSelectDestination = (destination) => {
    setPlace(destination);
    handle('location', destination);
    setFilteredDestinations([]);
  };

  const handle = (name, value) => {
    if (name === 'days' && value > 5) {
      toast.error("Please enter days less than 5");
      return;
    }
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const login = useGoogleLogin(
    {
      onSuccess:(codeResp)=>GetUserProfile(codeResp),
      onError:(error)=>console.log(error),
    }
  )

  const onGenerateTrip = async () => {

    const user = localStorage.getItem('user');

    if(!user){
      setOpenDialog(true);
      return;
    }
    if (!formData?.location || !formData?.days || !formData?.budget || !formData?.traveller) {
      toast.error("Please fill all the fields");
      return;
    }
    
    if (parseInt(formData.days) > 5) {
      toast.error("Please enter days less than 5");
      return;
    }

    setLoading(true);
    
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location)
      .replace('{totalDays}', formData?.days)
      .replace('{traveler}', formData?.traveller)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.days)
    
   
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log(result?.response?.text());
      setLoading(false);
      SaveAiTrip(result?.response?.text());
    }

  const GetUserProfile=(tokenInfo)=>{
    if (!tokenInfo?.access_token) {
      console.error("No access token received");
      return;
    }
    axios 
    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        Accept: "application/json",
      },
      })
      .then((resp)=>{
        console.log(resp);
        localStorage.setItem('user',JSON.stringify(resp.data));
        setOpenDialog(false);
        onGenerateTrip();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        toast.error("Failed to fetch Google user profile.");
      });
  };

  const SaveAiTrip=async(TripData)=>{
    setLoading(true);
    const user=JSON.parse(localStorage.getItem('user'));
    const docId=Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData:JSON.parse(TripData),
      userEmail:user?.email,
      id:docId
    });
    setLoading(false);
    navigate('/view-trip/'+docId);
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onGenerateTrip();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isNextDisabled = () => {
    if (currentStep === 1 && !formData.location) return true;
    if (currentStep === 2 && !formData.days) return true;
    if (currentStep === 3 && !formData.budget) return true;
    return false;
  };

  const getIconComponent = (iconString) => {
    const iconMap = {
      'fa fa-plane': faPlane,
      'fa fa-heart': faHeart,
      'fa fa-users': faUsers,
      'fa fa-user-friends': faUserFriends,
      'fa fa-users-cog': faUsersCog,
      'fa fa-dollar-sign': faDollarSign,
      'fa fa-money-bill-wave': faMoneyBillWave,
      'fa fa-gem': faGem,
      'fa fa-crown': faCrown
    };
    
    return iconMap[iconString] || faMapMarkerAlt;
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const renderProgressBar = () => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 mt-10 pb-20">
      <div className="bg-white shadow-lg rounded-2xl p-8">
        <h1 className="font-bold text-3xl text-center text-blue-600">
          <FontAwesomeIcon icon={faSuitcase} className="mr-2" />
          Plan Your Dream Trip
        </h1>
        <p className="mt-3 text-gray-600 text-center">
          Let's create an unforgettable journey together
        </p>

        {renderProgressBar()}

        <div className="mt-10">
          {currentStep === 1 && (
            <div className="transition-all duration-500 ease-in-out">
              <h2 className="font-bold text-2xl mb-6 text-gray-800 flex items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-blue-500" />
                Where are you going?
              </h2>
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  value={place}
                  onChange={handleInputChange}
                  placeholder="Search for a destination..."
                />
                {filteredDestinations.length > 0 && (
                  <ul className="absolute z-10 w-full mt-1 border rounded-lg bg-white shadow-lg max-h-60 overflow-y-auto">
                    {filteredDestinations.map((destination, index) => (
                      <li
                        key={index}
                        className="p-3 cursor-pointer hover:bg-blue-50 transition"
                        onClick={() => handleSelectDestination(destination)}
                      >
                        {destination}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {formData.location && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100 text-blue-700 flex items-center">
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                  Selected destination: <span className="font-medium ml-1">{formData.location}</span>
                </div>
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div className="transition-all duration-500 ease-in-out">
              <h2 className="font-bold text-2xl mb-6 text-gray-800 flex items-center">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-blue-500" />
                How many days are you planning to stay?
              </h2>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  max="5"
                  placeholder="Ex. 3"
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  value={formData.days || ""}
                  onChange={(e) => handle("days", e.target.value)}
                />
                <span className="ml-3 text-lg text-gray-700">days</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Maximum 5 days allowed</p>
              {formData.days && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100 text-blue-700 flex items-center">
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                  {formData.days > 1 
                    ? `You'll be enjoying ${formData.days} days in ${formData.location || "your destination"}!` 
                    : `You'll be enjoying a day trip to ${formData.location || "your destination"}!`}
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="transition-all duration-500 ease-in-out">
              <h2 className="font-bold text-2xl mb-6 text-gray-800 flex items-center">
                <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2 text-blue-500" />
                What is your budget?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {SelectBudgetList.map((item, index) => (
                  <div
                    key={index}
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all hover:shadow-md 
                      ${formData.budget === item.title 
                        ? "border-blue-500 bg-blue-50" 
                        : "border-gray-200 hover:border-blue-200"}`}
                    onClick={() => handle("budget", item.title)}
                  >
                    <div className="text-4xl mb-3 text-blue-600 flex justify-center">
                      <FontAwesomeIcon icon={getIconComponent(item.icon)} />
                    </div>
                    <h3 className="font-bold text-lg text-center">{item.title}</h3>
                    <p className="text-sm text-gray-500 text-center mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="transition-all duration-500 ease-in-out">
              <h2 className="font-bold text-2xl mb-6 text-gray-800 flex items-center">
                <FontAwesomeIcon icon={faUsers} className="mr-2 text-blue-500" />
                Who are you traveling with?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {SelectTravelList.map((item, index) => (
                  <div
                    key={index}
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all hover:shadow-md 
                      ${formData.traveller === item.title 
                        ? "border-blue-500 bg-blue-50" 
                        : "border-gray-200 hover:border-blue-200"}`}
                    onClick={() => handle("traveller", item.title)}
                  >
                    <div className="text-4xl mb-3 text-blue-600 flex justify-center">
                      <FontAwesomeIcon icon={getIconComponent(item.icon)} />
                    </div>
                    <h3 className="font-bold text-lg text-center">{item.title}</h3>
                    <p className="text-sm text-gray-500 text-center mt-1">{item.dec}</p>
                    <p className="text-xs text-blue-500 text-center mt-2 font-medium">
                      {item.people} {parseInt(item.people) === 1 ? 'person' : 'people'}
                    </p>
                  </div>
                ))}
              </div>

              {formData.traveller && (
                <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-xl mb-4 text-blue-700 flex items-center">
                    <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                    Trip Summary
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 mr-3 text-blue-500" />
                      <div>
                        <h4 className="font-medium text-gray-700">Destination</h4>
                        <p>{formData.location || "Not specified"}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FontAwesomeIcon icon={faCalendarAlt} className="mt-1 mr-3 text-blue-500" />
                      <div>
                        <h4 className="font-medium text-gray-700">Duration</h4>
                        <p>{formData.days || "0"} days</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FontAwesomeIcon icon={faMoneyBillWave} className="mt-1 mr-3 text-blue-500" />
                      <div>
                        <h4 className="font-medium text-gray-700">Budget</h4>
                        <p>{formData.budget || "Not specified"}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FontAwesomeIcon icon={faUsers} className="mt-1 mr-3 text-blue-500" />
                      <div>
                        <h4 className="font-medium text-gray-700">Traveling as</h4>
                        <p>{formData.traveller || "Not specified"}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    disabled={loading}
                    onClick={onGenerateTrip}
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition w-full flex items-center justify-center"
                  >
                    {loading ?<AiOutlineLoading className="h-7 w-7 animate-spin"/> :' Generate Trip Plan'}
                    <>
                    <FontAwesomeIcon icon={faPlane} className="mr-2" />
                    </>
                  </button>
                </div>



              )}
              <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>

                
                
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription>
                      <h2>Sign in with the google</h2>
                      <span>Sign in with the google authentication</span>

                    <Button
                    onClick={login}
                    className="w-full mt-5 flex gap-4 items-center"
                    >
                      <FcGoogle className="h-7 w-7"/>
                      Sign in with Google</Button>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
                </Dialog>
            </div>
          )}

          <div className="mt-10 flex justify-between">
            {currentStep > 1 ? (
              <button
                onClick={prevStep}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition flex items-center"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                Back
              </button>
            ) : (
              <div></div>
            )}
            
            {currentStep < totalSteps ? (
              <button
                onClick={nextStep}
                disabled={isNextDisabled()}
                className={`px-6 py-2 rounded-lg text-white transition flex items-center ${
                  isNextDisabled()
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Continue
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;