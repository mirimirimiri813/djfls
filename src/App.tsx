/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Flower2, Heart, Sparkles, User, Info, MapPin, Calendar, Activity, GraduationCap, Sun, Apple, X } from 'lucide-react';
import { students, teachers } from './data';

function ProfileModal({ profile, onClose }: { profile: any, onClose: () => void }) {
  if (!profile) return null;
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-sm w-full"
      >
        <div className="relative h-80 bg-indigo-50 flex items-center justify-center">
          {profile.imageUrl ? (
            <img src={profile.imageUrl} alt={profile.name} className="w-full h-full object-cover object-top" />
          ) : (
            <User size={64} className="text-indigo-200" />
          )}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors backdrop-blur-md"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-3xl font-heading text-gray-800">{profile.name}</h3>
              <p className="text-gray-500 font-medium">{profile.species} {profile.role ? `· ${profile.role}` : ''}</p>
            </div>
            <span className="font-mono text-sm font-bold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">{profile.mbti}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 bg-gray-50 p-4 rounded-2xl">
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Origin</span>
                <span className="font-medium flex items-center gap-1"><MapPin size={14} className="text-gray-400"/> {profile.origin}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Height</span>
                <span className="font-medium flex items-center gap-1"><Activity size={14} className="text-gray-400"/> {profile.height}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Birthday</span>
                <span className="font-medium flex items-center gap-1"><Calendar size={14} className="text-gray-400"/> {profile.birthday}</span>
              </div>
              {profile.age && (
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Age</span>
                  <span className="font-medium flex items-center gap-1">
                    {profile.age}
                    {profile.appearance && <span className="text-[10px] text-gray-500 bg-gray-200 px-1 rounded">({profile.appearance})</span>}
                  </span>
                </div>
              )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ClassSection({ title, age, icon: Icon, color, studentsList, onSelect }: { title: string, age: string, icon: React.ElementType, color: string, studentsList: any[], onSelect: (student: any) => void }) {
  return (
    <div className={`mb-16 p-6 md:p-8 rounded-3xl shadow-sm border-2 ${color} bg-white`}>
      <div className="flex items-center gap-4 mb-8 border-b-2 pb-4" style={{ borderColor: 'currentColor' }}>
        <div className={`p-3 rounded-full ${color} bg-opacity-20 text-current`}>
          <Icon size={32} />
        </div>
        <div>
          <h3 className="text-3xl font-heading text-gray-800 flex items-center gap-2">
            {title} <span className="text-lg font-sans font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">인간 나이 환산 {age}</span>
          </h3>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studentsList.map((student, idx) => (
          <motion.div 
            key={idx}
            onClick={() => onSelect(student)}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`p-5 rounded-2xl border cursor-pointer ${color.replace('border-', 'border-opacity-30 border-')} bg-gray-50 bg-opacity-50 hover:shadow-md transition-all flex flex-col justify-between`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm bg-gray-200 shrink-0">
                {student.imageUrl ? (
                  <img src={student.imageUrl} alt={student.name} className="w-full h-full object-cover object-top" />
                ) : (
                  <User className="w-full h-full text-white bg-gray-300 p-2" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex flex-col items-start gap-1">
                  <h4 className="text-xl font-heading text-gray-800 leading-none">{student.name}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-white rounded border border-gray-200 text-gray-600 shadow-sm inline-block">
                    {student.species}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-gray-400" />
                <span>{student.origin}</span>
                <span className="text-gray-300">|</span>
                <Activity size={14} className="text-gray-400" />
                <span>{student.height}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded text-gray-600"><Calendar size={12} className="text-gray-400"/> {student.birthday}</span>
                <span className="inline-flex items-center justify-center font-mono text-[10px] font-semibold px-1.5 py-0.5 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded">{student.mbti}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [selectedProfile, setSelectedProfile] = useState<any>(null);

  return (
    <div className="min-h-screen font-sans text-gray-800 relative">
      <AnimatePresence>
        {selectedProfile && (
          <ProfileModal profile={selectedProfile} onClose={() => setSelectedProfile(null)} />
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-kinder-pink/30 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-heading text-pink-500">
            <Star className="fill-kinder-yellow text-kinder-yellow" size={28} />
            별사탕 유치원
          </div>
          <div className="hidden md:flex gap-6 font-heading text-lg text-gray-600">
            <a href="#about" className="hover:text-pink-500 transition-colors">소개</a>
            <a href="#classes" className="hover:text-pink-500 transition-colors">반 소개</a>
            <a href="#teachers" className="hover:text-pink-500 transition-colors">선생님</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-4 text-center relative overflow-hidden bg-gradient-to-b from-kinder-pink/20 to-transparent">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-pink-100 text-pink-600 font-medium mb-6 shadow-sm">
            <Sparkles size={16} /> 특별한 아이들을 위한 특별한 공간
          </div>
          <h1 className="text-5xl md:text-7xl font-heading text-gray-800 mb-6 leading-tight">
            모두가 반짝이는<br/>
            <span className="text-pink-500">별사탕 유치원</span>에 오신 것을 환영합니다!
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed word-break-keep-all">
            인간, 마족, 수인, 로봇 등 다양한 종족의 어린이가 함께 모여 
            사랑과 우정을 배우는 따뜻한 보금자리입니다.
          </p>
        </motion.div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-[10%] text-kinder-yellow opacity-50"><Star size={40} className="fill-current" /></div>
        <div className="absolute top-40 right-[15%] text-kinder-purple opacity-50"><Heart size={32} className="fill-current" /></div>
        <div className="absolute bottom-10 left-[20%] text-kinder-green opacity-50"><Flower2 size={36} /></div>
      </header>

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12 shadow-sm border border-indigo-100">
            <Info className="mx-auto text-indigo-400 mb-4" size={48} />
            <h2 className="text-3xl font-heading text-gray-800 mb-6">별사탕 유치원만의 특별한 반 배정</h2>
            <p className="text-lg text-gray-700 leading-loose break-keep">
              우리 유치원은 종족마다 성장 속도가 다르다는 점을 깊이 이해하고 있습니다.<br/>
              따라서 <strong className="text-indigo-600 font-bold bg-indigo-100 px-2 py-1 rounded">절대 나이가 아닌 외형과 정신적 발달 수준</strong>(인간 나이 환산 기준)을 기준으로 반을 배정합니다.<br/>
              나이와 종족의 장벽을 넘어 모두가 친구가 될 수 있는 곳, 바로 별사탕 유치원입니다!
            </p>
          </div>
        </div>
      </section>

      {/* Main Content (Classes & Teachers) */}
      <main className="max-w-6xl mx-auto px-4 py-16" id="classes">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Main Content Area */}
          <div className="flex-1">
            <h2 className="text-4xl font-heading text-center mb-12 flex items-center justify-center gap-3">
              <span className="bg-kinder-pink text-white p-2 text-pink-600 rounded-xl"><Heart size={28} className="fill-current" /></span>
              우리 유치원 친구들
            </h2>
            
            <ClassSection 
              title="꽃잎반" 
              age="5살" 
              icon={Flower2} 
              color="border-pink-300 text-pink-500" 
              studentsList={students.petal}
              onSelect={setSelectedProfile}
            />
            
            <ClassSection 
              title="튤립반" 
              age="6살" 
              icon={Sun} 
              color="border-yellow-400 text-yellow-600" 
              studentsList={students.tulip}
              onSelect={setSelectedProfile}
            />
            
            <ClassSection 
              title="열매반" 
              age="7살" 
              icon={Apple} 
              color="border-green-400 text-green-600" 
              studentsList={students.fruit}
              onSelect={setSelectedProfile}
            />
          </div>
        </div>
      </main>

      {/* Teachers Section */}
      <section id="teachers" className="py-20 px-4 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-heading text-center mb-12 flex items-center justify-center gap-3">
            <span className="bg-indigo-500 text-white p-2 rounded-xl"><GraduationCap size={28} /></span>
            든든한 선생님 소개
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teachers.map((teacher, idx) => (
              <motion.div 
                key={idx}
                onClick={() => setSelectedProfile(teacher)}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden cursor-pointer"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-50 rounded-bl-full -z-10 opacity-50 transition-all group-hover:scale-110"></div>
                
                <div className="flex gap-6 items-start mb-6">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-gray-100 shrink-0">
                    {teacher.imageUrl ? (
                      <img src={teacher.imageUrl} alt={teacher.name} className="w-full h-full object-cover object-top" />
                    ) : (
                      <User className="w-full h-full text-white bg-indigo-200 p-2" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-3xl font-heading text-gray-800 flex items-baseline gap-2">
                      {teacher.name}
                      <span className="text-sm font-sans text-indigo-500 font-bold">{teacher.role}</span>
                    </h3>
                    <p className="text-gray-500 mt-1">{teacher.species} · {teacher.origin}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm text-gray-700 bg-gray-50 p-4 rounded-xl">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Height</span>
                    <span className="font-medium">{teacher.height}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Age</span>
                    <span className="font-medium flex items-center gap-1">
                      {teacher.age}
                      <span className="text-[10px] text-gray-500 bg-gray-200 px-1 rounded">({teacher.appearance})</span>
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Birthday</span>
                    <span className="font-medium">{teacher.birthday}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">MBTI</span>
                    <span className="font-mono text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded w-fit">{teacher.mbti}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-200 text-center text-gray-500">
        <div className="flex items-center justify-center gap-2 text-2xl font-heading text-gray-300 mb-4">
          <Star className="fill-gray-200" size={24} />
          별사탕 유치원
        </div>
        <p>© Star Candy Kindergarten. All rights reserved.</p>
        <p className="text-sm mt-2 font-heading">이곳에 모인 모든 작은 별들이 밝게 빛나기를 바랍니다.</p>
      </footer>
    </div>
  );
}
