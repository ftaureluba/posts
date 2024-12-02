import React, {useState} from 'react'
import { useNavigate} from 'react-router-dom'
import { apiService } from '../services/PostsService';
function Signup() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');


  const [trainingFrequency, setTrainingFrequency] = useState('');
  const [gymObjective, setGymObjective] = useState('');

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const validateStep1 = () => {
    return firstName.trim() !== '' && 
           lastName.trim() !== '' && 
           age.trim() !== '' && 
           weight.trim() !== '';
  };

  const validateStep2 = () => {
    return trainingFrequency.trim() !== '' && 
           gymObjective.trim() !== '';
  };

  const validateStep3 = () => {
    return email.trim() !== '' && 
           password.trim() !== '' && 
           username.trim() !== '';
  };

  
  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateStep1() || !validateStep2() || !validateStep3()) {
      alert('Please fill out all required fields');
      return;
    }
    
    try {
      const userData = {
        username: username,
        email: email,
        password: password
      };
    
      const response = await apiService.PostData('/api/signup', userData);
    
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error);
    }      
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="step">
            <h2>Personal Information</h2>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              required
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              required
            />
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
              required
            />
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Weight (kg)"
              required
            />
            <div className="navigation-buttons">
              <button type="button" onClick={nextStep} disabled={!validateStep1()}>
                Next
              </button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="step">
            <h2>Fitness Goals</h2>
            <select
              value={trainingFrequency}
              onChange={(e) => setTrainingFrequency(e.target.value)}
              required
            >
              <option value="">Select Training Frequency</option>
              <option value="1-2">1-2 times per week</option>
              <option value="3-4">3-4 times per week</option>
              <option value="5-7">5-7 times per week</option>
            </select>
            <select
              value={gymObjective}
              onChange={(e) => setGymObjective(e.target.value)}
              required
            >
              <option value="">Select Gym Objective</option>
              <option value="muscle-gain">Muscle Gain</option>
              <option value="weight-loss">Weight Loss</option>
              <option value="endurance">Improve Endurance</option>
              <option value="general-fitness">General Fitness</option>
            </select>
            <div className="navigation-buttons">
              <button type="button" onClick={prevStep}>
                Previous
              </button>
              <button type="button" onClick={nextStep} disabled={!validateStep2()}>
                Next
              </button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="step">
            <h2>Account Details</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <div className="navigation-buttons">
              <button type="button" onClick={prevStep}>
                Previous
              </button>
              <button type="submit" disabled={!validateStep3()}>
                Sign Up
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="multi-step-form">
      {renderStep()}
    </form>
  );
}

export default Signup;