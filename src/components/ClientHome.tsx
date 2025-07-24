"use client";
import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { InteractiveWorldMapSection } from "@/components/sections/InteractiveWorldMapSection";
import { InfluenceMapSection } from "@/components/sections/InfluenceMapSection";
import { LiveFeedSection } from "@/components/sections/LiveFeedSection";
import { SmartNarrativesSection } from "@/components/sections/SmartNarrativesSection";
import { DigitalLionSection } from "@/components/sections/DigitalLionSection";
import { AiDisinfoDetectorSection } from "@/components/sections/AiDisinfoDetectorSection";
import { ResponseToolSection } from "@/components/sections/ResponseToolSection";
import { TelegramHubSection } from "@/components/sections/TelegramHubSection";
import { WhatsAppCommunitySection } from "@/components/sections/WhatsAppCommunitySection";
import { DocumentArchiveSection } from "@/components/sections/DocumentArchiveSection";
import { ProjectTimelineSection } from "@/components/sections/ProjectTimelineSection";
import { ContributionSection } from "@/components/sections/ContributionSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

export default function ClientHome() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <InteractiveWorldMapSection />
      <InfluenceMapSection />
      <LiveFeedSection />
      <SmartNarrativesSection />
      <DigitalLionSection />
      <AiDisinfoDetectorSection />
      <ResponseToolSection />
      <TelegramHubSection />
      <WhatsAppCommunitySection />
      <DocumentArchiveSection />
      <ProjectTimelineSection />
      <ContributionSection />
      <ContactSection />
      <Footer />
    </>
  );
}
