import BlockData from "@/global/components/BlockData"

const WelcomeMessage = ({ welcomeMessageData }) => {
  return (
    <div className="container relative">
      <div className="cls-1 grid grid-cols-1 pb-8 text-center">
        <h3 className="cls-2 mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
          {welcomeMessageData && welcomeMessageData.title}
        </h3>
        {welcomeMessageData && (
          <BlockData className="cls-3 text-slate-400 max-w-xl mx-auto text-center" data={welcomeMessageData.content} />
        )}
      </div>
      {/*<!--end grid-->*/}
    </div>
  )
}

export default WelcomeMessage
