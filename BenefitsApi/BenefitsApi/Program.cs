using BenefitsApi.Context;
using BenefitsApi.Repositories;
using BenefitsApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(c =>
{
    //Enable CORS
    c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

//JSON Serializer
builder.Services.AddControllersWithViews().AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling=Newtonsoft.Json.ReferenceLoopHandling.Ignore);

builder.Services.AddSingleton<DapperContext>();

builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();

builder.Services.AddScoped<IDependentRepository, DependentRepository>();

builder.Services.AddScoped<IBenefitsRepository, BenefitsRepository>();

builder.Services.AddScoped<BenefitsService>();

builder.Services.AddScoped<BenefitsApi.Models.Benefits>();//this should really be a setting or something prbly


builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
//Enable CORS
app.UseCors(options=>options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseAuthorization();

app.MapControllers();

app.Run();
