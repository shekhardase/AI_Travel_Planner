import React, { useState, useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from '@/components/ui/input';
import { SelectBudgetOptions } from '@/constants/Options';
import { SelectTravelList } from '@/constants/Options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { AI_PROMPT } from '@/constants/Options';
import { ChatSession } from '@google/generative-ai';

const TravelTitle = () => {
    const [place, setplace] = useState(null);
    const [Formdata, setFormdata] = useState({});

    const handleInputChange = (name, value) => {
        setFormdata({
            ...Formdata,
            [name]: value,
        });
    };

    useEffect(() => {
        console.log(Formdata);
    }, [Formdata]);

    const OnGenerateTrip = async () => {
        if (!Formdata?.location || !Formdata?.noOfDays || !Formdata?.budget || !Formdata?.travelWith) {
            toast("Please fill all details");
            return;
        }

        // If all valid
        toast.success("Trip details are valid! 🚀");

        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', Formdata?.location)
            .replace('{totalDays}', Formdata?.noOfDays)
            .replace('{traveler}', Formdata?.travelWith)
            .replace('{budget}', Formdata?.budget);
        console.log(FINAL_PROMPT);

        const result = await ChatSession.sendMessage(FINAL_PROMPT);
        console.log(result?.response?.text());


    };

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
            <h2 className='font-bold text-3xl text-center text-blue-600'>
                Tell us your travel preference
            </h2>
            <p className='mt-3 text-gray-500 text-xl text-center'>
                Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
            </p>

            <div className='mt-10 flex flex-col gap-9'>
                {/* Destination Input */}
                <div>
                    <h2 className='text-xl my-3 font-medium text-gray-700'>
                        What is your destination?
                    </h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            value: place,
                            onChange: (v) => {
                                setplace(v);
                                handleInputChange('location', v.label);
                            },
                        }}
                        className='border rounded-lg p-2 shadow-sm'
                    />
                </div>

                {/* Number of Days Input */}
                <div>
                    <h2 className='text-xl my-3 font-medium text-gray-700'>
                        How many days are you planning your trip?
                    </h2>
                    <Input
                        placeholder={'Ex. 3'}
                        type="number"
                        className='border rounded-lg p-2 shadow-sm w-full'
                        onChange={(e) => handleInputChange('noOfDays', Number(e.target.value))}
                    />
                </div>

                {/* Budget Options */}
                <div>
                    <h2 className='text-xl my-3 font-medium text-gray-700'>
                        What is your budget?
                    </h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
                        {SelectBudgetOptions.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleInputChange('budget', item.title)}
                                className={`p-4 border rounded-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer text-center bg-white ${Formdata?.budget === item.title ? 'shadow-lg border-black' : ''
                                    }`}
                            >
                                <h2 className='text-2xl text-blue-500 mb-2'>{item.icon}</h2>
                                <h2 className='font-semibold text-lg text-gray-800'>{item.title}</h2>
                                <h2 className='text-sm text-gray-600 mt-1'>{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Travel With Options */}
                <div>
                    <h2 className='text-xl my-3 font-medium text-gray-700'>
                        What do you plan on travelling with on your next adventure?
                    </h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
                        {SelectTravelList.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleInputChange('travelWith', item.people)}
                                className={`p-4 border rounded-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer text-center bg-white ${Formdata?.travelWith === item.people ? 'shadow-lg border-black' : ''
                                    }`}
                            >
                                <h2 className='text-2xl text-blue-500 mb-2'>{item.icon}</h2>
                                <h2 className='font-semibold text-lg text-gray-800'>{item.title}</h2>
                                <h2 className='text-sm text-gray-600 mt-1'>{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className='flex justify-end mb-16 mt-10'>
                <Button onClick={OnGenerateTrip}>
                    Generate
                </Button>
            </div>
        </div>
    );
};

export default TravelTitle;
