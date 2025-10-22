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
import { ComunicacionMensajesContent, comunicacionMensajesMetadata } from './modules/capitulo2/08-comunicacion-mensajes';
import { GuiaCobrarOnlineContent, guiaCobrarOnlineMetadata } from './modules/capitulo2/09-guia-cobrar-online';
import { CalendarioDiarioProContent, calendarioDiarioProMetadata } from './modules/capitulo2/10-calendario-diario-pro';

// Capítulo 3 - Aprender a Vender
import { ConquistarVentasContent, conquistarVentasMetadata } from './modules/capitulo3/01-conquistar-ventas';
import { LaBaseRealContent, laBaseRealMetadata } from './modules/capitulo3/02-la-base-real';
import { GuiaVozCerrarContent, guiaVozCerrarMetadata } from './modules/capitulo3/03-guia-voz-cerrar';
import { CerrarPoderEmpatiaContent, cerrarPoderEmpatiaMetadata } from './modules/capitulo3/04-cerrar-poder-empatia';
import { ManualGuerraContent, manualGuerraMetadata } from './modules/capitulo3/05-manual-guerra';
import { ReescribirScriptContent, reescribirScriptMetadata } from './modules/capitulo3/06-reescribir-script';

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
        { ...hojaTrabajoOfertasMetadata, content: HojaTrabajoOfertasContent, driveUrl: "" },
        { ...comunicacionMensajesMetadata, content: ComunicacionMensajesContent, driveUrl: "" },
        { ...guiaCobrarOnlineMetadata, content: GuiaCobrarOnlineContent, driveUrl: "" },
        { ...calendarioDiarioProMetadata, content: CalendarioDiarioProContent, driveUrl: "" }
      ]
    },
    {
      id: 3,
      title: "Aprender a Vender",
      description: "Domina el arte de la venta con propósito",
      modules: [
        { ...conquistarVentasMetadata, content: ConquistarVentasContent, driveUrl: "" },
        { ...laBaseRealMetadata, content: LaBaseRealContent, driveUrl: "" },
        { ...guiaVozCerrarMetadata, content: GuiaVozCerrarContent, driveUrl: "" },
        { ...cerrarPoderEmpatiaMetadata, content: CerrarPoderEmpatiaContent, driveUrl: "" },
        { ...manualGuerraMetadata, content: ManualGuerraContent, driveUrl: "" },
        { ...reescribirScriptMetadata, content: ReescribirScriptContent, driveUrl: "" }
      ]
    }
  ]
};