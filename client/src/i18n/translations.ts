export type Language = 'ES' | 'EN' | 'PT';

export const translations = {
  ES: {
    nav: {
      dataIngestion: "Ingesta de Datos",
      intelligence: "Inteligencia",
      governance: "Gobernanza",
      join: "UNIRSE / ONBOARDING",
    },
    hero: {
      title: "Onboarding Corporativo",
      subtitle: "Start for Free",
      domainLabel: "Dominio Corporativo Principal",
      domainPlaceholder: "Ej: arcor.com.ar / Planta Industrial",
      submitButton: "Iniciar Ingesta",
    }
  },
  EN: {
    nav: {
      dataIngestion: "Data Ingestion",
      intelligence: "Intelligence",
      governance: "Governance",
      join: "JOIN / ONBOARDING",
    },
    hero: {
      title: "Corporate Onboarding",
      subtitle: "Start for Free",
      domainLabel: "Primary Corporate Domain",
      domainPlaceholder: "e.g. arcor.com.ar / Main Plant",
      submitButton: "Start Ingestion",
    }
  },
  PT: {
    nav: {
      dataIngestion: "Ingestão de Dados",
      intelligence: "Inteligência",
      governance: "Governança",
      join: "ENTRAR / ONBOARDING",
    },
    hero: {
      title: "Onboarding Corporativo",
      subtitle: "Start for Free",
      domainLabel: "Domínio Corporativo Principal",
      domainPlaceholder: "Ex: arcor.com.ar / Planta Industrial",
      submitButton: "Iniciar Ingestão",
    }
  }
};
