interface LayoutProps {
    children: React.ReactNode;    
}


function Layout({ children }: LayoutProps) {
  return (
    <div>
        <div className="p-4 bg-rose-500 w-full">
           I am a Navbar !!! 
        </div>
        {children}
    </div>
  )
}

export default Layout;




  
 