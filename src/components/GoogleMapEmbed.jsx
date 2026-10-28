const GoogleMapEmbed = () => {
   return (
      <div className="w-full  rounded-lg overflow-hidden ">
         <iframe
            title="Localisation DGC"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.800688452198!2d11.8530!3d-4.7762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a62b9c209b18793%3A0xXXXXXXXXXXXX!2sDGC%20Formation!5e0!3m2!1sfr!2scg!4v1680812345678!5m2!1sfr!2scg"
            width="100%"
            height="170px"
            allowFullScreen
            loading="lazy"
            className="border-0"
            referrerPolicy="no-referrer-when-downgrade"
         ></iframe>
      </div>
   );
};

export default GoogleMapEmbed;
