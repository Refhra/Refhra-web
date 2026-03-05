"use client";

import OnboardingCard from "@/components/onboarding/OnboardingCard";
import React, { useState } from "react";

const OnboardingWrapper = () => {
  const [CloseModal, setCloseModal] = useState<boolean>(false);
  return (
    <div>
      {!CloseModal && (
        <OnboardingCard closeModal={CloseModal} setCloseModal={setCloseModal} />
      )}
    </div>
  );
};

export default OnboardingWrapper;
