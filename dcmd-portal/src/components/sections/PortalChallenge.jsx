import { useEffect, useRef, useState } from 'react';
import Arrow from '../Arrow.jsx';
import { services } from '../../data/services.js';
import { QuestNote } from './PortalQuest.jsx';
import './PortalChallenge.css';

const scenarios = [
  {
    prompt: 'Two city offices lose their connection to the city network. Which team capability fits this situation?',
    answer: '01',
    explanation: 'Network Infrastructure covers the links, switches, and routing that connect city offices.',
    options: ['03', '02', '01', '04'],
  },
  {
    prompt: 'A city application is slowing down, and its server storage is nearly full. Which capability should investigate?',
    answer: '02',
    explanation: 'Data Center Operations monitors servers and manages the storage they depend on.',
    options: ['02', '04', '03', '01'],
  },
  {
    prompt: 'A city office notices unusual sign-in attempts. Which capability handles monitoring and access controls?',
    answer: '03',
    explanation: 'Cybersecurity covers access controls and security monitoring.',
    options: ['04', '03', '01', '02'],
  },
  {
    prompt: 'After a service interruption, a city database needs to be restored from a verified copy. Which capability fits?',
    answer: '04',
    explanation: 'Backup & Recovery covers restoring data and preparing services to recover from interruptions.',
    options: ['01', '02', '03', '04'],
  },
];

const serviceById = Object.fromEntries(services.map(service => [service.id, service]));

export default function PortalChallenge({ quest }) {
  const [round, setRound] = useState(-1);
  const [answers, setAnswers] = useState([]);
  const stepHeading = useRef(null);
  const answeredCount = answers.length;
  const score = answers.filter((answer, index) => answer === scenarios[index].answer).length;
  const scenario = scenarios[round];
  const selected = answers[round];
  const finished = round === scenarios.length;

  useEffect(() => {
    if (round >= 0) stepHeading.current?.focus();
  }, [round]);

  function start() {
    setAnswers([]);
    setRound(0);
  }

  return (
    <section className="portal-challenge" id="dcmd-challenge" aria-labelledby="dcmd-challenge-title" tabIndex={-1}>
      <div className="container challenge-layout">
        <div className="challenge-intro">
          <p className="eyebrow light">Interactive challenge</p>
          <h2 id="dcmd-challenge-title">Keep Butuan <span>connected.</span></h2>
          <p>Play four short scenarios and match each one to the DCMD service that can help.</p>
        </div>
        <div className="challenge-console">
          {round < 0 && (
            <button className="button button-primary" type="button" onClick={start}>
              Start challenge <Arrow />
            </button>
          )}
          {round >= 0 && (
            <div className="challenge-progress">
              <label htmlFor="challenge-progress">{answeredCount} of {scenarios.length} scenarios answered</label>
              <progress id="challenge-progress" value={answeredCount} max={scenarios.length} />
            </div>
          )}
          {scenario && (
            <>
              <h3 key={round} ref={stepHeading} tabIndex={-1}>{scenario.prompt}</h3>
              <div className="challenge-options" role="group" aria-label="Choose a DCMD service">
                {scenario.options.map(id => {
                  const service = serviceById[id];
                  const correct = selected && id === scenario.answer;
                  const incorrect = id === selected && id !== scenario.answer;
                  return (
                    <button
                      key={id}
                      type="button"
                      data-answer={correct ? 'correct' : incorrect ? 'incorrect' : undefined}
                      aria-disabled={selected !== undefined}
                      onClick={() => setAnswers(current => current.length === round ? [...current, id] : current)}
                    >
                      <span aria-hidden="true">{service.symbol}</span>
                      <span>{service.title}{correct && <small>Correct answer</small>}{incorrect && <small>Your answer</small>}</span>
                    </button>
                  );
                })}
              </div>
              <div className="challenge-feedback" role="status">
                {selected && (
                  <p><strong>{selected === scenario.answer ? 'Correct.' : `Best match: ${serviceById[scenario.answer].title}.`}</strong> {scenario.explanation}</p>
                )}
              </div>
              {selected && (
                <div className="challenge-actions">
                  <button className="button button-primary" type="button" onClick={() => {
                    const next = round + 1;
                    setRound(next);
                    if (next === scenarios.length) quest?.complete('services');
                  }}>
                    {round === scenarios.length - 1 ? 'See results' : 'Next scenario'} <Arrow />
                  </button>
                  <a className="challenge-link" href={`#service-${scenario.answer}`}>Explore this service <Arrow diagonal /></a>
                </div>
              )}
            </>
          )}
          {finished && (
            <div className="challenge-result">
              <h3 ref={stepHeading} tabIndex={-1}>You matched {score} out of {scenarios.length}</h3>
              <p>{score === scenarios.length ? 'You identified the right service in every scenario.' : 'Try again to practice matching each scenario to the right service.'}</p>
              <div className="challenge-actions">
                <button className="button button-primary" type="button" onClick={start}>Play again <Arrow /></button>
                <a className="challenge-link" href="#systems">Explore city systems <Arrow diagonal /></a>
              </div>
            </div>
          )}
          <QuestNote quest={quest} id="services">Finish all four scenarios to earn this checkpoint.</QuestNote>
        </div>
      </div>
    </section>
  );
}
