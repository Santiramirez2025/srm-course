import { CourseData } from './types';

// Capítulo 1 - Vivir Mejor
import { ParadigmasContent, paradigmasMetadata } from './modules/capitulo1/01-paradigmas';
import { HabitosContent, habitosMetadata } from './modules/capitulo1/02-habitos';
import { MentalidadContent, mentalidadMetadata } from './modules/capitulo1/03-mentalidad';
import { PropositoContent, propositoMetadata } from './modules/capitulo1/04-proposito';
import { RutinaContent, rutinaMetadata } from './modules/capitulo1/05-rutina';
import { EmocionalContent, emocionalMetadata } from './modules/capitulo1/06-emocional';
import { DescansoContent, descansoMetadata } from './modules/capitulo1/07-descanso';
import { EnergiaContent, energiaMetadata } from './modules/capitulo1/08-energia';
import { ConclusionVMContent, conclusionVMMetadata } from './modules/capitulo1/09-conclusion';

// Capítulo 2 - Trabajar Online
import { NichoContent, nichoMetadata } from './modules/capitulo2/01-nicho';
import { HerramientasContent, herramientasMetadata } from './modules/capitulo2/02-herramientas';
import { FreelancingContent, freelancingMetadata } from './modules/capitulo2/03-freelancing';
import { BrandingContent, brandingMetadata } from './modules/capitulo2/04-branding';
import { OfertasContent, ofertasMetadata } from './modules/capitulo2/05-ofertas';
import { ProductividadContent, productividadMetadata } from './modules/capitulo2/06-productividad';
import { ComunicacionContent, comunicacionMetadata } from './modules/capitulo2/07-comunicacion';
import { PlataformasContent, plataformasMetadata } from './modules/capitulo2/08-plataformas';
import { AutomatizacionContent, automatizacionMetadata } from './modules/capitulo2/09-automatizacion';
import { ConclusionTOContent, conclusionTOMetadata } from './modules/capitulo2/10-conclusion';

// Capítulo 3 - Aprender a Vender
import { PrincipiosContent, principiosMetadata } from './modules/capitulo3/01-principios';
import { PsicologiaContent, psicologiaMetadata } from './modules/capitulo3/02-psicologia';
import { CopywritingContent, copywritingMetadata } from './modules/capitulo3/03-copywriting';
import { StorytellingContent, storytellingMetadata } from './modules/capitulo3/04-storytelling';
import { ObjecionesContent, objecionesMetadata } from './modules/capitulo3/05-objeciones';
import { PresentacionContent, presentacionMetadata } from './modules/capitulo3/06-presentacion';
import { CierreContent, cierreMetadata } from './modules/capitulo3/07-cierre';
import { FidelizacionContent, fidelizacionMetadata } from './modules/capitulo3/08-fidelizacion';
import { UpsellingContent, upsellingMetadata } from './modules/capitulo3/09-upselling';
import { ConclusionVentasContent, conclusionVentasMetadata } from './modules/capitulo3/10-conclusion';

export const courseData: CourseData = {
  title: "Curso SRM",
  subtitle: "Aprendé a vivir mejor, trabajar online y vender con propósito",
  description: "Un curso completo para transformar tu vida personal y profesional",
  chapters: [
    {
      id: 1,
      title: "Vivir Mejor",
      description: "Fundamentos para una vida plena y equilibrada",
      modules: [
        { ...paradigmasMetadata, content: ParadigmasContent, driveUrl: "" },
        { ...habitosMetadata, content: HabitosContent, driveUrl: "" },
        { ...mentalidadMetadata, content: MentalidadContent, driveUrl: "" },
        { ...propositoMetadata, content: PropositoContent, driveUrl: "" },
        { ...rutinaMetadata, content: RutinaContent, driveUrl: "" },
        { ...emocionalMetadata, content: EmocionalContent, driveUrl: "" },
        { ...descansoMetadata, content: DescansoContent, driveUrl: "" },
        { ...energiaMetadata, content: EnergiaContent, driveUrl: "" },
        { ...conclusionVMMetadata, content: ConclusionVMContent, driveUrl: "" }
      ]
    },
    {
      id: 2,
      title: "Trabajar Online",
      description: "Construye tu carrera digital desde cero",
      modules: [
        { ...nichoMetadata, content: NichoContent, driveUrl: "" },
        { ...herramientasMetadata, content: HerramientasContent, driveUrl: "" },
        { ...freelancingMetadata, content: FreelancingContent, driveUrl: "" },
        { ...brandingMetadata, content: BrandingContent, driveUrl: "" },
        { ...ofertasMetadata, content: OfertasContent, driveUrl: "" },
        { ...productividadMetadata, content: ProductividadContent, driveUrl: "" },
        { ...comunicacionMetadata, content: ComunicacionContent, driveUrl: "" },
        { ...plataformasMetadata, content: PlataformasContent, driveUrl: "" },
        { ...automatizacionMetadata, content: AutomatizacionContent, driveUrl: "" },
        { ...conclusionTOMetadata, content: ConclusionTOContent, driveUrl: "" }
      ]
    },
    {
      id: 3,
      title: "Aprender a Vender",
      description: "Domina el arte de la venta con propósito",
      modules: [
        { ...principiosMetadata, content: PrincipiosContent, driveUrl: "" },
        { ...psicologiaMetadata, content: PsicologiaContent, driveUrl: "" },
        { ...copywritingMetadata, content: CopywritingContent, driveUrl: "" },
        { ...storytellingMetadata, content: StorytellingContent, driveUrl: "" },
        { ...objecionesMetadata, content: ObjecionesContent, driveUrl: "" },
        { ...presentacionMetadata, content: PresentacionContent, driveUrl: "" },
        { ...cierreMetadata, content: CierreContent, driveUrl: "" },
        { ...fidelizacionMetadata, content: FidelizacionContent, driveUrl: "" },
        { ...upsellingMetadata, content: UpsellingContent, driveUrl: "" },
        { ...conclusionVentasMetadata, content: ConclusionVentasContent, driveUrl: "" }
      ]
    }
  ]
};