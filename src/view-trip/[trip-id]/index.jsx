import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Hotels from "../components/Hotels";
import InfoSection from "../components/InfoSection";
import PlaceToVisit from "../components/PlaceToVisit";

function ViewTrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState([]);

    useEffect(() => {
        const GetTripData = async () => {
            const docRef = doc(db, "AITrips", tripId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setTrip(docSnap.data());
            } else {
                console.log("No such document!");
            }
        };

        if (tripId) {
            GetTripData();
        }
    }, [tripId]);
    return (
        <div>
            {/* Information Section  */}
            <InfoSection trip={trip} />
            {/* Recommended Hotels */}
            <Hotels trip={trip} />
            {/* Daily Plan
             */}
             <PlaceToVisit trip={trip} />
             {/* Foooter  */}
        </div>
    );
}

export default ViewTrip;