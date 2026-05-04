import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "5586999614557";
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá, vim pelo site da NUMERARE e gostaria de atendimento contábil."
)}`;

const fadeUp = {
  hidden: { opacity: 0, y: 42 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function SectionHeader({ label, title, text, center = false, light = false }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={center ? "mx-auto max-w-4xl text-center" : "max-w-4xl"}
    >
      <p className="mb-5 text-xs font-black uppercase tracking-[0.34em] text-[#c79a35]">
        {label}
      </p>
      <h2 className={`font-serif text-4xl leading-tight md:text-6xl ${light ? "text-white" : "text-[#17120a]"}`}>
        {title}
      </h2>
      {text && (
        <p className={`mt-6 text-lg leading-relaxed ${light ? "text-white/65" : "text-[#62584a]"}`}>
          {text}
        </p>
      )}
    </motion.div>
  );
}

function LuxuryDivider() {
  return <div className="my-7 h-px w-28 bg-gradient-to-r from-[#b88422] via-[#f0d38b] to-transparent" />;
}

function PremiumCard({ children, dark = false }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 170, damping: 18 }}
      className={
        dark
          ? "border border-[#d8c08a]/25 bg-white/[0.06] p-7 shadow-2xl shadow-black/20 backdrop-blur-xl"
          : "border border-[#d8c08a]/30 bg-white p-7 shadow-xl shadow-black/5"
      }
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [sent, setSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [form, setForm] = useState({ nome: "", email: "", telefone: "" });

  const navItems = [
    { id: "quem-somos", label: "Quem somos" },
    { id: "servicos", label: "Serviços" },
    { id: "como-funciona", label: "Como funciona" },
    { id: "noticias", label: "Notícias" },
  ];

  const servicos = [
    {
      icon: "01",
      title: "Assessoria contábil",
      text: "Rotina contábil completa para empresas privadas, com acompanhamento técnico e consultivo.",
    },
    {
      icon: "02",
      title: "Assessoria fiscal e tributária",
      text: "Organização fiscal, obrigações tributárias e apoio para reduzir riscos fiscais.",
    },
    {
      icon: "03",
      title: "Assessoria trabalhista e previdenciária",
      text: "Folha, admissões, férias, rescisões e obrigações trabalhistas com segurança.",
    },
    {
      icon: "04",
      title: "Consultoria contábil",
      text: "Orientação estratégica para empresários tomarem decisões com mais clareza e controle.",
    },
  ];

  const passos = [
    {
      n: "01",
      title: "Entendemos sua empresa",
      text: "Analisamos o segmento, rotina fiscal, folha, documentos e principais necessidades do negócio.",
      tag: "Diagnóstico inicial",
    },
    {
      n: "02",
      title: "Organizamos sua contabilidade",
      text: "Estruturamos processos contábeis, fiscais e trabalhistas para reduzir riscos e atrasos.",
      tag: "Sem burocracia",
    },
    {
      n: "03",
      title: "Acompanhamos sua evolução",
      text: "Você recebe orientação contínua para tomar decisões melhores e manter a empresa segura.",
      tag: "Suporte consultivo",
    },
  ];

  const noticias = [
    "Reforma Tributária: o que sua empresa precisa acompanhar",
    "Simples Nacional: cuidados para evitar pendências fiscais",
    "Como organizar documentos contábeis da empresa",
  ];

  useEffect(() => {
    const sections = ["inicio", "quem-somos", "servicos", "como-funciona", "noticias", "contato"];

    const handleScroll = () => {
      setScrolled(window.scrollY > 35);
      const current = sections.find((id) => {
        const element = document.getElementById(id);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 140 && rect.bottom >= 140;
      });
      if (current) setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    const msg = encodeURIComponent(
      `Olá, meu nome é ${form.nome}. Vim pelo site da NUMERARE. Telefone: ${form.telefone}. E-mail: ${form.email}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5eddb] text-[#17120a]">
      {sent && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 px-5 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white p-8 text-center shadow-2xl"
          >
            <h3 className="font-serif text-3xl">Mensagem enviada!</h3>
            <p className="mt-3 text-[#62584a]">Em breve entraremos em contato com você.</p>
            <button
              onClick={() => setSent(false)}
              className="mt-6 bg-[#c79a35] px-7 py-3 font-black text-[#17120a]"
            >
              Fechar
            </button>
          </motion.div>
        </div>
      )}

      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[#080706]/92 shadow-xl backdrop-blur-2xl" : "bg-[#080706]/78 backdrop-blur-xl"
        }`}
      >
        <div className={`mx-auto flex max-w-7xl items-center px-5 transition-all duration-500 ${scrolled ? "h-[66px]" : "h-[78px]"}`}>
          <a href="#inicio" className="flex w-[230px] shrink-0 items-center">
            <img
              src={`${import.meta.env.BASE_URL}logo_numerare_sem_fundo_nova.png`}
              alt="Numerare Assessoria Contábil"
              className={`w-auto object-contain transition-all duration-500 ${scrolled ? "h-11" : "h-14"}`}
            />
          </a>

          <nav className="hidden flex-1 items-center gap-10 text-[15px] font-semibold text-white/75 md:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative transition-all duration-300 hover:text-white ${activeSection === item.id ? "text-white" : ""}`}
              >
                {item.label}
                <span
                  className={`absolute left-0 -bottom-2 h-[2px] bg-[#d9b766] transition-all duration-300 ${
                    activeSection === item.id ? "w-full" : "w-0"
                  }`}
                />
              </a>
            ))}
          </nav>

          <a
            href={whatsappUrl}
            className="ml-auto shrink-0 bg-gradient-to-r from-[#b88422] to-[#f0d38b] px-8 py-3 text-sm font-black uppercase tracking-wide text-[#17120a] shadow-lg shadow-[#c79a35]/20 transition hover:scale-105 hover:shadow-[#c79a35]/35"
          >
            Fale Conosco
          </a>
        </div>
      </header>

      <section id="inicio" className="relative flex min-h-screen items-center overflow-hidden bg-[#080706] text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
            alt="Ambiente corporativo contábil"
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/88 to-black/35" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_50%,rgba(201,161,69,0.18),transparent_36%)]" />
        </div>

        <motion.img
          src="/logo-nova-numerare.png"
          alt="Numerare Assessoria Contábil"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 0.12, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute right-[-4%] top-1/2 hidden w-[46rem] -translate-y-1/2 object-contain md:block"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-20">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-4xl">
            <motion.p variants={fadeUp} className="mb-6 text-xs font-black uppercase tracking-[0.36em] text-[#f0d38b]">
              Numerare Assessoria Contábil • Aciel Castelo Branco
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">
              Estratégia, precisão
              <br /> e resultados para sua empresa.
            </motion.h1>
            <motion.div variants={fadeUp}>
              <LuxuryDivider />
            </motion.div>
            <motion.p variants={fadeUp} className="max-w-2xl text-lg leading-relaxed text-white/72">
              Uma assessoria contábil premium para empresários que valorizam segurança fiscal, decisões bem orientadas e crescimento com controle.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href={whatsappUrl}
                className="bg-gradient-to-r from-[#b88422] to-[#f0d38b] px-9 py-4 text-center font-black uppercase tracking-wide text-[#17120a] shadow-xl shadow-[#c79a35]/20 transition hover:scale-[1.02]"
              >
                Solicitar atendimento
              </a>
              <a
                href="#quem-somos"
                className="border border-[#f0d38b]/35 px-9 py-4 text-center font-bold uppercase tracking-wide text-white transition hover:bg-white/10"
              >
                Conhecer a Numerare
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="quem-somos" className="bg-[#f5eddb] px-5 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Quem somos"
            title="Contabilidade com tradição, ética e excelência desde 2011."
            text="A Numerare Assessoria Contábil foi criada pelo contador Aciel Castelo Branco com o propósito de contribuir com empresários do Piauí, Maranhão e região. Atuamos com empresas privadas oferecendo assessoria contábil, fiscal, tributária, trabalhista, previdenciária e consultoria contábil com alto padrão técnico."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {["Estratégia", "Precisão", "Resultados"].map((item) => (
              <motion.div
                key={item}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="border-l border-[#c79a35] bg-white/70 p-8 shadow-lg shadow-black/5"
              >
                <h3 className="font-serif text-3xl text-[#17120a]">{item}</h3>
                <p className="mt-3 text-[#62584a]">
                  Um pilar da nossa forma de atender empresários que buscam segurança e crescimento.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="servicos" className="bg-[#080706] px-5 py-24 text-white md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeader light label="Serviços" title="Soluções premium para proteger e impulsionar sua empresa." />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-12 grid gap-5 md:grid-cols-4"
          >
            {servicos.map((s) => (
              <PremiumCard key={s.title} dark>
                <span className="font-serif text-5xl text-[#f0d38b]">{s.icon}</span>
                <h3 className="mt-5 font-serif text-2xl text-white">{s.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/62">{s.text}</p>
              </PremiumCard>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="como-funciona" className="bg-[#f5eddb] px-5 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            center
            label="Como funciona"
            title="Comece em 3 passos simples"
            text="Um processo objetivo, pensado para entregar clareza, controle e segurança para a rotina empresarial."
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-12 grid gap-6 md:grid-cols-3"
          >
            {passos.map((p) => (
              <PremiumCard key={p.n}>
                <span className="font-serif text-6xl text-[#c79a35]">{p.n}</span>
                <h3 className="mt-5 font-serif text-2xl text-[#17120a]">{p.title}</h3>
                <p className="mt-4 text-[#62584a]">{p.text}</p>
                <p className="mt-6 inline-block bg-[#f0dfb8] px-4 py-2 text-sm font-black text-[#8a6721]">
                  {p.tag}
                </p>
              </PremiumCard>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="noticias" className="bg-[#080706] px-5 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            className="border border-[#d8c08a]/20 bg-white/[0.06] p-8 backdrop-blur-2xl md:p-12"
          >
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#d9b766]">Notícias contábeis</p>
                <h2 className="mt-4 font-serif text-4xl md:text-5xl">Informação para empresários.</h2>
              </div>
              <a href={whatsappUrl} className="font-bold text-[#f0d38b]">Receber novidades →</a>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {noticias.map((n) => (
                <article key={n} className="bg-[#0f0e0c] p-6 ring-1 ring-white/10">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#d9b766]">Artigo</p>
                  <h3 className="mt-4 font-serif text-2xl">{n}</h3>
                  <p className="mt-4 text-sm text-white/55">
                    Conteúdo claro para apoiar empresários em temas fiscais, tributários e trabalhistas.
                  </p>
                </article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="contato" className="bg-[#f5eddb] px-5 py-28 md:py-36">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto grid max-w-7xl overflow-hidden border border-[#d8c08a]/30 bg-white shadow-2xl shadow-black/10 md:grid-cols-2"
        >
          <div className="p-8 md:p-12">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#c79a35]">Fale conosco</p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">
              Preencha seus dados e entraremos em contato rapidinho.
            </h2>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <input
                required
                placeholder="Nome"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                className="w-full border border-[#d8c08a]/40 bg-[#fbf6eb] px-5 py-4 outline-none focus:border-[#c79a35]"
              />
              <input
                required
                type="email"
                placeholder="E-mail"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-[#d8c08a]/40 bg-[#fbf6eb] px-5 py-4 outline-none focus:border-[#c79a35]"
              />
              <input
                required
                placeholder="Telefone"
                value={form.telefone}
                onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                className="w-full border border-[#d8c08a]/40 bg-[#fbf6eb] px-5 py-4 outline-none focus:border-[#c79a35]"
              />
              <button className="w-full bg-gradient-to-r from-[#b88422] to-[#f0d38b] px-8 py-4 font-black uppercase tracking-wide text-[#17120a]">
                Enviar
              </button>
            </form>
          </div>
          <div className="bg-gradient-to-r from-[#b88422] to-[#f0d38b] p-8 text-[#17120a] md:p-12">
            <h3 className="font-serif text-4xl">Atendimento</h3>
            <div className="mt-8 space-y-3 font-semibold opacity-85">
              <p>Telefone: 86 3303-2789</p>
              <p>WhatsApp: 86 99966-5365</p>
              <p>E-mail: contato@numerareac.com.br</p>
              <p>Site: www.numerareac.com.br</p>
              <p>Instagram: @numerareac</p>
              <p>Facebook: fb.me/numerareac</p>
              <p>Rua Desembargador Pires de Castro, nº 1449, Marquês, Teresina-PI</p>
            </div>
            <div className="mt-8 bg-[#17120a]/10 p-6 font-black">
              <p>Segunda a sexta</p>
              <p>08h às 12h • 14h às 18h</p>
            </div>
            <a href={whatsappUrl} className="mt-8 inline-block bg-[#17120a] px-9 py-4 font-black uppercase tracking-wide text-white">
              Chamar no WhatsApp
            </a>
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-[#d8c08a]/20 bg-[#080706] px-5 py-10 text-white/60">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h3 className="font-serif text-2xl tracking-[0.18em] text-white">NUMERARE</h3>
            <p>Assessoria Contábil</p>
          </div>
          <p>© 2026 NUMERARE Assessoria Contábil. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
