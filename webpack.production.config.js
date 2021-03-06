
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
  const common = require('./webpack.common.js');
  const TerserPlugin = require("terser-webpack-plugin");
  const webpack = require("webpack")
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports =merge(common, {

   
   
     mode:"production",

   output:{
filename:"[name].[contenthash].bundle.js",
path: path.resolve(__dirname, 'dist')
   },
        
         plugins: [
          new HtmlWebpackPlugin({
   
            template: './src/index.html'
           
        }),
        new MiniCssExtractPlugin({
          filename:"[name].[hash:4].css"
        }),//bu yarattıgımız css dosyasına alır csslerımızı
          new webpack.ProgressPlugin(),
         
          ],
        

         optimization: {
        
          minimizer: [
            new TerserPlugin({
             
              terserOptions: {
                compress: {
                  drop_console: true,
                },
              },
            }),
          ],
        },

    module:{
      rules:[
        {
          
          test: /\.s?css$/,
          use: [
       
           MiniCssExtractPlugin.loader,
           
          
            "css-loader",
        
            "sass-loader",
          ],
        },
        { 
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets:{
                        esmodules:true
                  }
                  
                  }
                ]
              ]
            
            }
          }
        },

        {
          test: /\.(mp4|png)$/i,
       
          loader: 'file-loader',
          options: {
            name:"[name].[hash:4].[ext]",
           
            outputPath: 'images',
            publicPath: 'images'

          },
        },

      ]


    }

      })