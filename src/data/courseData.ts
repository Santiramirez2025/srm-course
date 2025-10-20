import { CourseData } from './types';

// Capítulo 1 - Vivir Mejor
import { ParadigmasContent, paradigmasMetadata } from './modules/capitulo1/01-paradigmas';
import { VisionMundoContent, visionMundoMetadata } from './modules/capitulo1/02-vision-mundo';
import { NaturalezaMetaContent, naturalezaMetaMetadata } from './modules/capitulo1/03-naturaleza-meta';
import { DesarrolloPersonalContent, desarrolloPersonalMetadata } from './modules/capitulo1/04-desarrollo-personal';
import { CadenasContent, cadenasMetadata } from './modules/capitulo1/05-cadenas';
import { HonestidadContent, honestidadMetadata } from './modules/capitulo1/06-honestidad';
import { ResistenciaContent, resistenciaMetadata } from './modules/capitulo1/07-resistencia';
import PolaridadContent, { energiaMetadata } from './modules/capitulo1/08-polaridad';
import { ConstantesContent, constantesMetadata } from './modules/capitulo1/09-constantes';

// Capítulo 2 - Trabajar Online
import { FuerzasIrracionalidadContent, fuerzasIrracionalidadMetadata } from './modules/capitulo2/01-fuerzas-irracionalidad';
import { EntornoTrabajoContent, entornoTrabajoMetadata } from './modules/capitulo2/02-entorno-trabajo';
import { NichoIdealContent, nichoIdealMetadata } from './modules/capitulo2/03-nicho-ideal';
import { DominarNichoContent, dominarNichoMetadata } from './modules/capitulo2/04-dominar-nicho';
import { OfertasIPsicologiaContent, ofertasIPsicologiaMetadata } from './modules/capitulo2/05-ofertas-psicologia';
import { OfertasIIConstruccionContent, ofertasIIConstruccionMetadata } from './modules/capitulo2/06-ofertas-construccion';
import { HojaTrabajoOfertasContent, hojaTrabajoOfertasMetadata } from './modules/capitulo2/07-hoja-trabajo-ofertas';

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
        { ...visionMundoMetadata, content: VisionMundoContent, driveUrl: "" },
        { ...naturalezaMetaMetadata, content: NaturalezaMetaContent, driveUrl: "" },
        { ...desarrolloPersonalMetadata, content: DesarrolloPersonalContent, driveUrl: "" },
        { ...cadenasMetadata, content: CadenasContent, driveUrl: "" },
        { ...honestidadMetadata, content: HonestidadContent, driveUrl: "" },
        { ...resistenciaMetadata, content: ResistenciaContent, driveUrl: "" },
        { ...energiaMetadata, content: PolaridadContent, driveUrl: "" },
        { ...constantesMetadata, content: ConstantesContent, driveUrl: "" }
      ]
    },
    {
      id: 2,
      title: "Trabajar Online",
      description: "Construye tu carrera digital desde cero",
      modules: [
        { ...fuerzasIrracionalidadMetadata, content: FuerzasIrracionalidadContent, driveUrl: "" },
        { ...entornoTrabajoMetadata, content: EntornoTrabajoContent, driveUrl: "" },
        { ...nichoIdealMetadata, content: NichoIdealContent, driveUrl: "" },
        { ...dominarNichoMetadata, content: DominarNichoContent, driveUrl: "" },
        { ...ofertasIPsicologiaMetadata, content: OfertasIPsicologiaContent, driveUrl: "" },
        { ...ofertasIIConstruccionMetadata, content: OfertasIIConstruccionContent, driveUrl: "" },
        { ...hojaTrabajoOfertasMetadata, content: HojaTrabajoOfertasContent, driveUrl: "" }
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